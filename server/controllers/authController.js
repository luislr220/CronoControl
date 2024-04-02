const nodemailer = require("nodemailer");

// Credenciales y configuración de transporte
const accountTransport = {
  service: "gmail",
  auth: {
    user: "hostw730@gmail.com",
    pass: "bivb zjgg hish fhtu",
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
      text: `Tu token de inicio de sesión es: ${token} Tienes 20 minutos para usarlo antes de que expire`,
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
