import Sendgrid from 'sendgrid';
import tableify from 'tableify';
import Mustache from 'mustache';
import templates from './config/emails';

const {
  SENDGRID_API_KEY, EMAIL_TO, EMAIL_SENDER, EMAIL_DEBUG,
} = process.env;

const mail = (subject, content, isHtml, toEmail, fromEmail) => new Promise((resolve, reject) => {
  console.log(subject, content, isHtml, toEmail, fromEmail);
  if (SENDGRID_API_KEY && EMAIL_TO) {
    const helper = Sendgrid.mail;
    const from = fromEmail || EMAIL_SENDER || 'my@email.com';
    const to = EMAIL_DEBUG === 'true' || EMAIL_DEBUG === true ? EMAIL_TO : toEmail || EMAIL_TO;
    const parsedContent = (isHtml) ?
      new helper.Content('text/html', content) :
      new helper.Content('text/plain', content);

    const sg = Sendgrid(SENDGRID_API_KEY);
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: new helper.Mail(
        new helper.Email(from),
        subject,
        new helper.Email(to),
        parsedContent,
      ).toJSON(),
    });

    console.log(`Sending mail '${subject}' to ${to}`);
    sg.API(request, (error, response) => {
      console.log('Email Status:', response.statusCode);
      if (!error && (response.statusCode >= 200 || response.statusCode < 300)) { // Email OK
        resolve();
      } else {
        reject(error, response);
      }
    });
  } else {
    console.log(' --- WARNING: Missing configuration variables SENDGRID_API_KEY or EMAIL_TO ------');
    reject(new Error('Missing configuration variables SENDGRID_API_KEY or EMAIL_TO'));
  }
});

const DEFAULTCONTEXT = Object.assign({}, process.env);
const setContext = variables => Object.assign({}, DEFAULTCONTEXT, variables);

const templateMail = (templateName, context, toEmail, fromEmail) => mail(
  Mustache.render(templates[templateName].title, setContext(context)),
  Mustache.render(templates[templateName].content, setContext(context)),
  true,
  toEmail,
  fromEmail,
);

const welcomeEmail = user =>
  mail('New User', tableify(user), true)
    .then(() => templateMail(
      'welcome',
      { user },
      user.email,
    ))
    .then(() => { console.log(`Welcome emails sent for user ${user.email}`); })
    .catch((err) => { console.log(`ERROR: Welcome emails NOT sent for user ${user.email}`, err); });

const passwordEmail = user =>
  templateMail('password', { user }, user.email)
    .then(() => { console.log(`Password retrieval email sent for user ${user.email}`); })
    .catch((err) => { console.log(`ERROR: Password retrieval email NOT sent for user ${user.email}`, err); });

export {
  mail,
  welcomeEmail,
  passwordEmail,
};

