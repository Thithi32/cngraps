import Slack from 'slack-node';

export default (txt, channel) => {
  const webhookUri = process.env.SLACK_HOOK_URI;
  const defaultChannel = 'websitebot';
  const env = process.env.SLACK_ENV_NAME;
  const prod = env === 'production';

  if (webhookUri && webhookUri.length) {
    const message = {
      username: `WebsiteBot ${!prod ? ` | ${env}` : ''}`,
      icon_emoji: ':smile:',
      text: txt,
    };

    const currentChannel = channel || defaultChannel;
    message.channel = currentChannel + (prod ? '' : '_dev');

    const slack = new Slack();
    slack.setWebhook(webhookUri);

    return slack.webhook(message, (err) => {
      if (err) {
        console.log('Error with slack message: ', message);
      }
    });
  }

  return null;
};
