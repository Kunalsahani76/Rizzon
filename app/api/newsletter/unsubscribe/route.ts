import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to company email
      subject: `Newsletter Unsubscribe Request - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
            Newsletter Unsubscribe Request
          </h2>
          
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="color: #991b1b; margin-top: 0;">Unsubscribe Details:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Unsubscribe Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Unsubscribe Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #374151; font-size: 14px;">
              <strong>Action Required:</strong> Please remove this email address from your newsletter mailing list to comply with unsubscribe requests.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              This unsubscribe request was submitted from the Rizonn website unsubscribe page.
            </p>
          </div>
        </div>
      `,
    };

    // Confirmation email for user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Unsubscribed from Rizonn Newsletter - Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
              Unsubscribed Successfully
            </h1>
            <p style="color: #d1d5db; margin: 10px 0 0 0; font-size: 16px;">
              You have been removed from our newsletter
            </p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">
              Hello,
            </h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              This email confirms that <strong>${email}</strong> has been successfully unsubscribed from the Rizonn newsletter.
            </p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6b7280;">
              <h3 style="color: #374151; margin-top: 0;">What this means:</h3>
              <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>You will no longer receive marketing emails from Rizonn</li>
                <li>You may still receive transactional emails (order confirmations, support responses)</li>
                <li>Your unsubscribe request is effective immediately</li>
              </ul>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              We're sorry to see you go! If you change your mind, you can always subscribe again by visiting our website or contacting our team.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://rizonn.in" style="background-color: #6b7280; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                <strong>Need help or have questions?</strong><br>
                Contact our team at <a href="mailto:info@rizonn.in" style="color: #2563eb;">info@rizonn.in</a> or call us at +91-9667656203
              </p>
            </div>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              If you didn't request this unsubscribe, please contact us immediately.<br>
              This action was performed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
              © ${new Date().getFullYear()} Rizonn Technologies. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(confirmationMailOptions)
    ]);

    return NextResponse.json(
      { 
        message: 'Successfully unsubscribed from newsletter',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}