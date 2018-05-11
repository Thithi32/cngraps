const signature = `
  <p>Cheers!</p>
`;

export default {
  welcome: {
    title: 'Bem-vindo!',
    content: `
      <p>Parabéns!<p>
      ${signature}`,
  },
  password: {
    title: 'Sua senha',
    content: `<p>
      Para atualizar a senha da sua conta, por favor, clique nesse link:
      <a href="/#/activation/{{user.passwordActivation}}">/#/activation/{{user.passwordActivation}}</a>.
    </p>
    <p>
      Atenciosamente,<br/>
      Equipe do site.
    </p>`,
  },
};
