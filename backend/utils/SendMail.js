import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
} = process.env;

const EMAIL_USER = 'lambdahouse416@gmail.com'; // fixed sender address

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const SendMail = async ({ type, to, subject, text, html }) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const commonAttachments = [
    {
      filename: 'logo.png',
      path: path.resolve('./client/src/assets/logo.png'),
      cid: 'banner',
    },
    {
      filename: 'map.png',
      path: path.resolve('./client/src/assets/map.png'),
      cid: 'mapimage',
    },
  ];

  // Default options
  let mailOptions = {
    from: `"Lambda House" <${EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
    attachments: commonAttachments,
  };

  switch (type) {
    case 'contact':
      mailOptions.to = EMAIL_USER; // send to admin
      mailOptions.replyTo = to; // person who filled out the form
      break;
    case 'order_placed':
      mailOptions.subject = subject || 'Your Order Has Been Placed';
      break;
    case 'order_shipped':
      mailOptions.subject = subject || 'Your Order Has Been Shipped';
      break;
    case 'order_delivered':
      mailOptions.subject = subject || 'Your Order Has Been Delivered';
      break;
    case 'account_created':
      mailOptions.subject = subject || 'Welcome to Lambda House';
      break;
    case 'newsletter':
      mailOptions.subject = subject || 'Latest from Lambda House';
      break;
    default:
      throw new Error(`Unsupported email type: ${type}`);
  }

  if (!mailOptions.to || mailOptions.to.trim() === '') {
    throw new Error('Recipient email address is missing.');
  }

  const result = await transporter.sendMail(mailOptions);
  return result;
};
