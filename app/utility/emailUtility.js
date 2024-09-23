import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from "../config/config.js";


const SendEmail=async(EmailTO,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host:EMAIL_HOST,
        port:EMAIL_PORT,
        secure:EMAIL_SECURITY,
        auth:{
            user:EMAIL_USER,
            pass:EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false
        }

    });
let mailOptions ={

    from: '"Ostad MERN 6 👻" <mern_ostad@themesoft69.com>',   //'Task manager MERN <info@teamrabbil.com>',
    to:EmailTO,
    subject:EmailSubject,
    text:EmailText,
}

return await transporter.sendMail(mailOptions)

}
export default SendEmail;