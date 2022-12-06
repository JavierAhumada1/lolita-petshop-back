import nodemailer from "nodemailer";

const emailForgetPassword = async(data) => {
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
    subject: 'Restablece tu password',
    text: 'Restablece tu password',
    html: `<p>Hola: ${name}, has solicitado tu password.</p>
            <p>Sigue el siguiente enlace para generaa un nuevo password: </p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password<a/></p>
            <p>Si tu no creaste esta cuenta, puede ignorar este mensaje</p>
    `
  });

  console.log(`Mensaje Enviado: %s`, info.messageId)

};

export default emailForgetPassword;
