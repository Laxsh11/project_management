import Mailgen from "mailgen";
import nodemailer from "nodemailer";


// Email Services (Sending the email)
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink12.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHTML = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Service failed silently happened because of credentials");
        console.error("Error: ", error);
    }
}

// Email Verification
const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our app",
            action: {
                instructions: "to verify email click here",
                button: {
                    color: "rgb(38, 38, 151)",
                    text: "verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need Help"
        },
    };
};
// Password Reset (Forgot Password)
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "Request to reset password",
            action: {
                instructions: "to reset password",
                button: {
                    color: "rgb(38, 38, 151)",
                    text: "Reset",
                    link: passwordResetUrl
                },
            },
            outro: "Need Help"
        },
    };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}