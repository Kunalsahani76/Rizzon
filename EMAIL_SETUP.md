# Email Integration Setup

This document describes the email functionality implemented for the Rizonn website.

## Features

### Contact Form (`/contact`)
- Collects name, email, and message from visitors
- Sends formatted emails to company email address
- Includes form validation and success/error feedback
- Responsive design with loading states

### Partner Application Form (`/partner/apply`)
- Comprehensive partner application form
- Collects company information, contact details, and partnership preferences
- Sends detailed application emails to company
- Multi-step form with validation

### Newsletter Subscription (`/api/newsletter`)
- Newsletter subscription with email validation
- Welcome email sent to subscribers
- Admin notification for new subscriptions
- Multiple newsletter component variants (footer, inline, full-featured)
- Unsubscribe functionality with confirmation emails

## Technical Implementation

### API Routes
- `/api/contact` - Handles contact form submissions
- `/api/partner` - Handles partner application submissions
- `/api/newsletter` - Handles newsletter subscriptions
- `/api/newsletter/unsubscribe` - Handles newsletter unsubscribe requests

### Email Service
- Uses **Nodemailer** with Gmail SMTP
- Configured with app-specific password for security
- HTML formatted emails with professional styling
- Error handling and validation

### Environment Variables
```
EMAIL_USER=rizonntechnologies@gmail.com
EMAIL_PASS=bovy sfkf hhtl vxdw
```

## Email Templates

### Contact Form Email
- Subject: "New Contact Form Submission from [Name]"
- Includes contact details and message
- Professional HTML formatting

### Partner Application Email
- Subject: "New Partner Application from [Company Name]"
- Comprehensive company and contact information
- Partnership details and preferences
- Additional messages and notes

### Newsletter Subscription Emails
- **Admin Notification**: "New Newsletter Subscription from [Name/Email]"
- **Welcome Email**: "Welcome to Rizonn Newsletter - Stay Updated with Latest Networking Solutions"
- Rich HTML formatting with branding
- Includes unsubscribe link for compliance

### Newsletter Unsubscribe Emails
- **Admin Notification**: "Newsletter Unsubscribe Request - [Email]"
- **Confirmation Email**: "Unsubscribed from Rizonn Newsletter - Confirmation"
- Clear confirmation of unsubscribe action
- Contact information for support

## Security Features
- Environment variable validation
- Input sanitization and validation
- Required field validation
- Email format validation
- Rate limiting through Next.js API routes

## Usage

1. **Contact Form**: Visit `/contact` and fill out the form
2. **Partner Application**: Visit `/partner/apply` for detailed application
3. **Newsletter Subscription**: Available in footer, homepage, and as standalone component
4. **Newsletter Unsubscribe**: Visit `/unsubscribe` or use email links

All forms provide real-time feedback and confirmation messages upon successful submission.

## Newsletter Components

### Newsletter Component (`/components/Newsletter.tsx`)
- **Default Variant**: Full-featured with optional name field
- **Footer Variant**: Compact horizontal layout for footer
- **Inline Variant**: Minimal design for inline placement
- Form validation and error handling
- Loading states and success/error feedback

### Newsletter Section (`/components/NewsletterSection.tsx`)
- Dedicated section for homepage/landing pages
- Animated background elements
- Feature grid highlighting newsletter benefits
- Motion animations with Framer Motion

## Testing

The email functionality has been tested with:
- Form validation (required fields)
- Email sending (Gmail SMTP)
- Error handling
- Success/failure feedback
- Responsive design

## Dependencies

```json
{
  "nodemailer": "^6.x.x",
  "@types/nodemailer": "^6.x.x"
}
```