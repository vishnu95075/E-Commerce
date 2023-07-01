const nodeMailer = require("nodemailer");

const sendEmail = async (option) => {
    const tranporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }

    });

    const mailOption = {
        from: process.env.SMPT_MAIL,
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await tranporter.sendMail(mailOption)
};

module.exports = sendEmail