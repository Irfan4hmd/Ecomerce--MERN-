const nodemailer=require('nodemailer');

const sendEmail=async options =>{
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "66e6ce4db68579",
          pass: "f8306f520a91c7"
        }
      });
      const message={
          from:`irfan ahmed <noreply@irfan.com>`,
          to:options.email,
          subject:options.subject,
          text:options.message
      }
      await transport.sendMail(message)
}
module.exports= sendEmail