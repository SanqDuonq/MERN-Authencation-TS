import { VERICATION_EMAIL_TEMPLATE } from "./mail-templates";
import { mailClient, sender } from "./mailconfig";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
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
