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

    const formData = await request.json();

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'phone', 'businessType'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to company email
      subject: `New Partner Application from ${formData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Partner Application
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Company Information:</h3>
            <p><strong>Company Name:</strong> ${formData.companyName}</p>
            <p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
            <p><strong>Business Type:</strong> ${formData.businessType}</p>
            <p><strong>Company Size:</strong> ${formData.companySize || 'Not provided'}</p>
            <p><strong>Annual Revenue:</strong> ${formData.annualRevenue || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Contact Information:</h3>
            <p><strong>Contact Name:</strong> ${formData.contactName}</p>
            <p><strong>Title:</strong> ${formData.title || 'Not provided'}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Partnership Details:</h3>
            <p><strong>Partnership Interest:</strong> ${formData.partnershipType || 'Not specified'}</p>
            <p><strong>Target Markets:</strong> ${formData.targetMarkets || 'Not provided'}</p>
            <p><strong>Experience:</strong> ${formData.experience || 'Not provided'}</p>
          </div>
          
          ${formData.message ? `
          <div style="background-color: #fef7cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Additional Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${formData.message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              This email was sent from the Rizonn partner application form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Partner application sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending partner application:', error);
    return NextResponse.json(
      { error: 'Failed to send partner application' },
      { status: 500 }
    );
  }
}