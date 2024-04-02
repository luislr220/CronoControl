const nodemailer = require("nodemailer");

// Credenciales y configuración de transporte
const accountTransport = {
  service: "gmail",
  auth: {
    user: "cronocontrol@gmail.com",
    pass: "ycga jwed rsbs oipg",
  },
};

// Función para obtener un transportador de correo con las credenciales proporcionadas
const mailTransporter = nodemailer.createTransport({
  service: accountTransport.service,
  auth: {
    user: accountTransport.auth.user,
    pass: accountTransport.auth.pass,
  },
});

// Función para enviar el correo electrónico
const enviarCorreo = async (correoDestinatario, token) => {
  try {
    const mailOptions = {
      from: accountTransport.auth.user,
      to: correoDestinatario,
      subject: "Token de inicio de sesión",
      html: `
      
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Token de Inicio de Sesión</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center; /* Centro de todo el contenido */
    }

    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      color: #555;
      font-size: 16px;
      line-height: 1.6;
    }

    strong {
      color: #000;
    }

    footer {
      margin-top: 20px;
      color: #888;
      font-size: 14px;
    }

    .blue-bar {
      background-color: #007bff;
      height: 10px;
      margin-bottom: 20px;
    }

    .logo {
      width: 50px,
      heigth: 100px
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="blue-bar"></div>
    <h1>Token de auntenticación</h1>
    <p>Saludos cordiales, este correo es para confirmar que tu solicitud fue aprobada por ingresar el siguiente token.</p>
    <p>El token es:</p>
    <strong>${token}</strong>
    <p>Este código caducará en 20 minutos y solo se podrá utilizar una vez.</p>
    <div class="blue-bar"></div> <!-- Barra de color azul -->
  </div>
  
  <footer>
    Este correo electrónico se envió a ${correoDestinatario} para informarte sobre alertas de seguridad importantes en relación con tu cuenta.
  </footer>
</body>
</html>

      
      `,
    };

    // Enviar correo electrónico
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.log("Error al enviar el correo:", error);
    throw error;
  }
};

// Exportar la función para enviar el correo electrónico
module.exports = {
  enviarCorreo,
};
