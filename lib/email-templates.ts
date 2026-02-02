export const getWelcomeEmailTemplate = (name: string, locale: string) => {
  const templates = {
    pt: {
      subject: '🎉 Bem-vindo à Plataforma de Shadowing!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 30px; text-align: center; color: white; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #111; font-size: 22px; margin-top: 0; }
              .content p { color: #666; line-height: 1.6; font-size: 16px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Bem-vindo!</h1>
              </div>
              <div class="content">
                <h2>Olá, ${name}!</h2>
                <p>Seu cadastro na <strong>Plataforma de Shadowing</strong> foi realizado com sucesso!</p>
                <p>Agora você pode começar a melhorar sua pronúncia praticando com falantes nativos e recebendo feedback instantâneo.</p>
                <p>Estamos muito felizes em tê-lo conosco nessa jornada de aprendizado!</p>
                <a href="http://localhost:3000" class="button">Começar Agora</a>
              </div>
              <div class="footer">
                <p>Plataforma de Shadowing © 2026</p>
                <p>Se você não criou esta conta, por favor ignore este email.</p>
              </div>
            </div>
          </body>
        </html>
      `
    },
    es: {
      subject: '🎉 ¡Bienvenido a la Plataforma de Shadowing!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 30px; text-align: center; color: white; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #111; font-size: 22px; margin-top: 0; }
              .content p { color: #666; line-height: 1.6; font-size: 16px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 ¡Bienvenido!</h1>
              </div>
              <div class="content">
                <h2>¡Hola, ${name}!</h2>
                <p>Tu registro en la <strong>Plataforma de Shadowing</strong> se ha completado con éxito!</p>
                <p>Ahora puedes comenzar a mejorar tu pronunciación practicando con hablantes nativos y recibiendo retroalimentación instantánea.</p>
                <p>¡Estamos muy felices de tenerte con nosotros en este viaje de aprendizaje!</p>
                <a href="http://localhost:3000" class="button">Comenzar Ahora</a>
              </div>
              <div class="footer">
                <p>Plataforma de Shadowing © 2026</p>
                <p>Si no creaste esta cuenta, por favor ignora este correo.</p>
              </div>
            </div>
          </body>
        </html>
      `
    },
    en: {
      subject: '🎉 Welcome to the Shadowing Platform!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 30px; text-align: center; color: white; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #111; font-size: 22px; margin-top: 0; }
              .content p { color: #666; line-height: 1.6; font-size: 16px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome!</h1>
              </div>
              <div class="content">
                <h2>Hello, ${name}!</h2>
                <p>Your registration on the <strong>Shadowing Platform</strong> was successful!</p>
                <p>You can now start improving your pronunciation by practicing with native speakers and receiving instant feedback.</p>
                <p>We're very happy to have you with us on this learning journey!</p>
                <a href="http://localhost:3000" class="button">Get Started Now</a>
              </div>
              <div class="footer">
                <p>Shadowing Platform © 2026</p>
                <p>If you didn't create this account, please ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `
    }
  };

  return templates[locale as keyof typeof templates] || templates.en;
};
