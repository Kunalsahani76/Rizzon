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

    const { email, name } = await request.json();

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
      subject: `New Newsletter Subscription from ${name || email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Subscriber Details:</h3>
            <p><strong>Email:</strong> ${email}</p>
            ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
            <p><strong>Subscription Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Subscription Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              This email was sent from the Rizonn website newsletter subscription form.
            </p>
          </div>
        </div>
      `,
    };

    // Welcome email for subscriber
    const welcomeMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Rizonn Newsletter - Stay Updated with Latest Networking Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
              Welcome to Rizonn Newsletter!
            </h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
              Thank you for subscribing to our newsletter
            </p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">
              ${name ? `Hi ${name},` : 'Hello,'}
            </h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Welcome to the Rizonn community! You've successfully subscribed to our newsletter and will now receive the latest updates about:
            </p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Latest WiFi 6 and networking technology updates</li>
                <li>New product launches and feature announcements</li>
                <li>Industry insights and best practices</li>
                <li>Exclusive offers and partner programs</li>
                <li>Technical guides and case studies</li>
                <li>Webinars and training opportunities</li>
              </ul>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              Stay ahead with cutting-edge networking solutions and be the first to know about our innovative access point controllers, wireless infrastructure, and enterprise networking products.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://rizonn.in/products" style="background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Explore Our Products
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
              You're receiving this email because you subscribed to Rizonn newsletter.<br>
              If you no longer wish to receive these emails, you can 
              <a href="https://rizonn.in/unsubscribe?email=${encodeURIComponent(email)}" style="color: #2563eb;">unsubscribe here</a>.
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
      transporter.sendMail(welcomeMailOptions)
    ]);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}