import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERICATION_EMAIL_TEMPLATE } from "./mail-templates";
import { mailClient, sender } from "./mailconfig";

export const sendVerificationEmail = async (email: string,verificationToken: string) => {
  const recipient = [{ email }];
  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending verification email ${error}`);
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];

  try {
    const response = await mailClient.send({
      from: sender,
      to: recipient,
      template_uuid: "da0cff89-8793-4325-a8b7-7955f01a4e89",
      template_variables: {
        company_info_name: "Authencation Company",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log(`Error sending welcome email ${error}`);
  }
};

export const sendPasswordReset = async (email:string, resetURL:string) => {
    const recipient = [{email}]

    try {
      const response = await mailClient.send({
        from: sender,
        to: recipient,
        subject: 'Reset Password',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetURL),
        category: 'Password Reset'
      })
    } catch (error) {
        console.log(`Error sending reset password`,error)
    }
}

export const sendResetSuccessEmail = async(email:string) => {
  const recipient = [{email}]

  try {
    const response = await mailClient.send({
      from:sender,
      to:recipient,
      subject: "Password Reset Succesfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset'
    })
    console.log('Password reset email sent successfully',response)
  } catch (error) {
      console.log('Error sending password reset success email',error)
  }
}