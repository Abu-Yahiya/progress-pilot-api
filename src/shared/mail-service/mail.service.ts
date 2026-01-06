import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  // mail transporter
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  /**
   * send mail to user email with link
   * @param sendTo string - email
   * @param __htmlPayload - string - content of email
   */
  async sendMail(sendTo: string, __htmlPayload: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: sendTo,
      subject: 'Your Link',
      html: __htmlPayload,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
