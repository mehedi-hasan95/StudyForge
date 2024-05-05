import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/verification?token=${token}`;

  await resend.emails.send({
    from: "verify@elysiumdeveloper.com",
    to: email,
    subject: "Verification Email",
    html: `<p>Please <a href="${confirmLink}">confirm</a> the email</p>`,
  });
};

// // Reset password for forgot password
export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: "security@elysiumdeveloper.com",
    to: email,
    subject: "Reset Password",
    html: `<p>Please click to <a href="${confirmLink}">confirm</a> reset your password</p>`,
  });
};
