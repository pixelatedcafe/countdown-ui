// app/api/send-email/route.js

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log('Email received in request body:', email);
    const username = email.split('@')[0];
    const capUsername = username.charAt(0).toUpperCase() + username.slice(1);

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Received email:', email);
    console.log('Zoho Password:', process.env.ZOHO_PASSWORD);
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'admin@uandinaturals.com',
        pass:  process.env.ZOHO_PASSWORD,
      },
    });

    const transporterTwo = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'info@uandinaturals.com',
        pass:  process.env.ZOHO_PASSWORD_TWO,
      },
    });

    await transporter.sendMail({
      from: '"U&I Admin" <admin@uandinaturals.com>',
      to: '"U&I Naturals" <info@uandinaturals.com>',
      // cc: '"The Pixelated Cafe" <info@thepixelatedcafe.com>',
      subject: 'New Subscriber Email',
      text: `A new user has subscribed with the email: ${email}`,
      html: `<p>A new user has subscribed with the email: <strong>${email}</strong></p>
      <p>Best regards,<br/>U&I Naturals Admin</p>`
      ,
    });

    // Welcome email to the subscriber
     await transporterTwo.sendMail({
  from: '"U&I Naturals" <info@uandinaturals.com>',
  replyTo: 'info@uandinaturals.com',
  to: email,
  subject: 'Welcome to the U&I Naturals Family!',
  text: `Hello ${capUsername},

We’re so happy to have you with us!

By joining U&I Naturals before our official launch, you’ve become one of our special family members — someone who believed in us right from the start.

Your trust means the world to us, and as a thank-you, you’ll get exclusive early access, special offers, and sneak peeks — behind-the-scenes updates before anyone else.

At U&I Naturals, we’re all about care, honesty, and a touch of nature in everything we do — because our journey is always You & I together.

Welcome to the family — we’re so excited to grow with you!

Warm hugs,
The U&I Naturals Team
Natural care for every You & I

To unsubscribe, reply to this email with "Unsubscribe" or contact us at info@uandinaturals.com.
`,

  html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h6">Hello ${capUsername},</h6>
      <p>We’re so happy to have you with us! <span style="font-size: 15px;">❤️</span></p>

      <p>By joining <strong>U&I Naturals</strong> before our official launch, you’ve become one of our
      special family members — someone who believed in us right from the start.</p>

      <p>Your trust means the world to us, and as a thank-you, you’ll get
      <strong>exclusive early access</strong>, <strong>special offers</strong>, and <strong>sneak peeks</strong>,
      behind-the-scenes updates before anyone else.</p>

      <p>At <strong>U&I Naturals</strong>, we’re all about care, honesty, and a touch of nature in everything
      we do — because our journey is always <em>You & I together.</em></p>

      <p style="font-weight: bold;">Welcome to the family — we’re so excited to grow with you!</p>

      <p style="margin-top: 20px;">Warm hugs,<br/>
      <strong>The U&I Naturals Team</strong><br/>
      <em>Natural care for every You & I</em></p>

      <img src="https://www.uandinaturals.com/rose.png" alt="U&I Naturals Logo" style="max-width: 100px; margin-top: 20px;">

      <p style="font-size: 12px; color: #777; margin-top: 30px;">
        To unsubscribe, reply to this email with "Unsubscribe" or contact us at 
        <a href="mailto:info@uandinaturals.com" style="color: #2e8b57;">info@uandinaturals.com</a>.
      </p>
    </div>
  `,
});


    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}