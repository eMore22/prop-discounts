// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Here, you would typically use a service like Nodemailer, SendGrid, or Brevo
    // to send the email to yourself. For now, we'll just log the data.

    console.log('New contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to process contact form submission:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}