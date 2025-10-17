// app/api/send-email/route.js
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Async function to send admin notification (fire-and-forget)
async function sendAdminNotification(email) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'admin@uandinaturals.com',
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"U&I Admin" <admin@uandinaturals.com>',
      to: '"U&I Naturals" <info@uandinaturals.com>',
      subject: 'New Member Notification',
      text: `A new member has joined our U&I Naturals family with the email: ${email}`,
      html: `<p>A new member has joined our U&I Naturals family with the email: <strong>${email}</strong></p>
      <p>Best regards,<br/>U&I Naturals Admin</p>`
    });
    
    console.log('Admin notification sent successfully for:', email);
  } catch (error) {
    // Log error but don't throw - this is a background task
    console.error('Failed to send admin notification:', error);
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const username = email.split('@')[0];
    const capUsername = username.charAt(0).toUpperCase() + username.slice(1);

    // Check if already registered
    const { data: existing, error: checkError } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', email);

    if (checkError) {
      console.error('Database check error:', checkError);
      throw checkError;
    }

    if (existing && existing.length > 0) {
      console.log('Found existing registration for:', email);
      return NextResponse.json({ message: 'You already registered!' }, { status: 200 });
    }

    // Insert new registration first (atomic; fails if concurrent duplicate)
    const { error: insertError } = await supabase
      .from('registrations')
      .insert({ email });

    if (insertError) {
      if (insertError.code === '23505') {  // Unique violation
        return NextResponse.json({ message: 'You already registered!' }, { status: 200 });
      }
      throw insertError;
    }

    // Send welcome email to user
    const transporterTwo = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'info@uandinaturals.com',
        pass: process.env.ZOHO_PASSWORD_TWO,
      },
    });

    await transporterTwo.sendMail({
      from: '"U&I Naturals" <info@uandinaturals.com>',
      replyTo: 'info@uandinaturals.com',
      to: email,
      subject: 'Welcome to the U&I Naturals Family!',
      text: `Hello ${capUsername},

We're so happy to have you with us!

By joining U&I Naturals before our official launch, you've become one of our special family members — someone who believed in us right from the start.

Your trust means the world to us, and as a thank-you, you'll get exclusive early access, special offers, and sneak peeks — behind-the-scenes updates before anyone else.

At U&I Naturals, we're all about care, honesty, and a touch of nature in everything we do — because our journey is always You & I together.

Welcome to the family — we're so excited to grow with you!

Warm hugs,
The U&I Naturals Team
Natural care for every You & I

To unsubscribe, reply to this email with "Unsubscribe" or contact us at info@uandinaturals.com.
`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h6>Hello ${capUsername},</h6>
          <p>We're so happy to have you with us! <span style="font-size: 15px;">❤️</span></p>

          <p>By joining <strong>U&I Naturals</strong> before our official launch, you've become one of our
          special family members — someone who believed in us right from the start.</p>

          <p>Your trust means the world to us, and as a thank-you, you'll get
          <strong>exclusive early access</strong>, <strong>special offers</strong>, and <strong>sneak peeks</strong>,
          behind-the-scenes updates before anyone else.</p>

          <p>At <strong>U&I Naturals</strong>, we're all about care, honesty, and a touch of nature in everything
          we do — because our journey is always <em>You & I together.</em></p>

          <p style="font-weight: bold;">Welcome to the family — we're so excited to grow with you!</p>

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

    // Send response to client immediately
    const response = NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

    // Send admin notification asynchronously (fire-and-forget)
    // This won't block the response
    sendAdminNotification(email).catch(err => {
      console.error('Background admin notification failed:', err);
    });

    return response;

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}