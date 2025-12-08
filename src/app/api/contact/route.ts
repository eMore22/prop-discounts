import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.GMAIL_USER,  // Your correct email: propfirmdiscountss@gmail.com
      subject: `New Contact Form: ${subject || 'Inquiry'}`,
      text: `Name: ${name}\nEmail: ${email}\nReason: ${subject}\n\nMessage:\n${message}`,
      html: `<h2>New Message from Prop Coupons</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Reason:</strong> ${subject}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}