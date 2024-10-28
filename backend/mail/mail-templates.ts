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

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      font-size: 24px;
      color: #333333;
    }
    .email-body {
      margin-top: 20px;
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
    }
    .email-footer {
      margin-top: 30px;
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
    .reset-button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 12px 25px;
      background-color: #28a745;
      color: #ffffff;
      text-align: center;
      border-radius: 5px;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
    }
    .reset-button:hover {
      background-color: #218838;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1 class="email-header">Reset Your Password</h1>
    <div class="email-body">
      <p>Hello,</p>
      <p>You requested a password reset for your account. Please click the button below to reset your password:</p>
      <a href="{resetURL}" class="reset-button">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="email-footer">
      <p>Thank you,<br>Your Company Team</p>
    </div>
  </div>
</body>
</html>

`

export const PASSWORD_RESET_SUCCESS_TEMPLATE = ` 
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Successful</title>
    <style>
        /* Định dạng chung */
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }

        /* Khung chính */
        .container {
            max-width: 400px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        /* Tiêu đề */
        h2 {
            color: #4CAF50;
            margin-bottom: 10px;
            font-size: 24px;
        }

        /* Icon thành công */
        .icon-success {
            font-size: 50px;
            color: #4CAF50;
            margin-bottom: 15px;
        }

        /* Nội dung */
        p {
            color: #333;
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        /* Button đăng nhập */
        .btn-login {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        .btn-login:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon-success">✔️</div>
        <h2>Đặt lại mật khẩu thành công!</h2>
        <p>Mật khẩu của bạn đã được thay đổi thành công. Bạn có thể đăng nhập bằng mật khẩu mới.</p>
    </div>
</body>
</html>

`