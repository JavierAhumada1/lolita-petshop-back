import nodemailer from "nodemailer";

const emailRegistro = async(data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:  process.env.EMAIL_PORT,
    auth: {
      user:  process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASS,
    },
  });

  //enviar email
  const {name, email, token} = data
  const info = await transport.sendMail({
    from: "Lolita Petshop - Venta de comida y accesorios para mascotas",
    to: email,
    subject: 'Comprueba tu cuenta en Lolita Petshop',
    text: 'Comprueba tu cuenta en Lolita Petshop',
    html: `<p>Hola: ${name}, comprueba tu cuenta en Lolita Petshop.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta<a/></p>

            <p>Si tu no creaste esta cuenta, puede ignorar este mensaje</p>
    `
  });

  console.log(`Mensaje Enviado: %s`, info.messageId)

};

export default emailRegistro;
