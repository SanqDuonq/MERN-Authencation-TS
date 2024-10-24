export const VERICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        .verify-code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            background-color: #f0f8ff;
            padding: 15px;
            border-radius: 8px;
            letter-spacing: 4px;
            display: inline-block;
            margin: 20px 0;
        }
        .verify-btn {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 16px;
        }
        .verify-btn:hover {
            background-color: #0056b3;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up! Please use the verification code below to confirm your email address:</p>
            <div class="verify-code">{verificationCode}</div>
            <p>Alternatively, you can click the button below to verify your email.</p>
            <a href="#" class="verify-btn">Verify Email</a>
            <p>If you did not sign up, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="#">Contact us</a>.</p>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>


`