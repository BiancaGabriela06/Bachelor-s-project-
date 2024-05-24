import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const sendMail = async (email, mailSubject, content) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "ecovoyageromania@gmail.com",
        pass: "kbgpvwesfiwifrmh"
      }
    });
    
    const mailOptions = {
      from: "ecovoyageromania@gmail.com",
      to: email,
      subject: mailSubject,
      html: content
    };

    const info = await transport.sendMail(mailOptions);

    return info;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};


export default sendMail;