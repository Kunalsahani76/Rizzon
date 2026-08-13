import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

interface UserDetails {
    name: string;
    email: string;
    company: string;
    phone: string;
    country: string;
}

interface RequestBody {
    userDetails: UserDetails;
    productModel: string;
}

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Send email notification to admin
const sendDownloadNotification = async (userDetails: UserDetails, productModel: string) => {
    try {
        const transporter = createTransporter();
        
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
                .info-item { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; }
                .info-label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
                .info-value { color: #374151; }
                .product-info { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; }
                .timestamp { color: #6b7280; font-size: 12px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🔔 New Datasheet Download Request</h2>
                    <p>Someone has downloaded a product datasheet from your website</p>
                </div>
                
                <div class="content">
                    <div class="product-info">
                        <h3>📄 Downloaded Product: ${productModel}</h3>
                        <p>Datasheet successfully downloaded and delivered to user</p>
                    </div>
                    
                    <h3>👤 User Information:</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Full Name</div>
                            <div class="info-value">${userDetails.name}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email Address</div>
                            <div class="info-value">${userDetails.email}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Company</div>
                            <div class="info-value">${userDetails.company}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Phone</div>
                            <div class="info-value">${userDetails.phone || 'Not provided'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Country</div>
                            <div class="info-value">${userDetails.country || 'Not provided'}</div>
                        </div>
                    </div>
                    
                    <div class="timestamp">
                        📅 Downloaded on: ${new Date().toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                        })}
                    </div>
                    
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                    
                    <p style="color: #6b7280; font-size: 14px;">
                        💡 <strong>Follow-up Suggestion:</strong> This is a qualified lead interested in ${productModel}. 
                        Consider reaching out to ${userDetails.name} at ${userDetails.email} to discuss their requirements.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to your own email
            subject: `🔔 New Datasheet Download: ${productModel} - ${userDetails.company}`,
            html: htmlContent,
            text: `
New Datasheet Download Request

Product: ${productModel}
Name: ${userDetails.name}
Email: ${userDetails.email}
Company: ${userDetails.company}
Phone: ${userDetails.phone || 'Not provided'}
Country: ${userDetails.country || 'Not provided'}
Downloaded: ${new Date().toISOString()}

This is a potential lead - consider following up!
            `.trim()
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Admin email notification sent successfully');
        
    } catch (error) {
        console.error('❌ Failed to send admin email notification:', error);
        // Don't throw error - we don't want to block the download if email fails
    }
};

// Send confirmation email to user
const sendUserConfirmation = async (userDetails: UserDetails, productModel: string, pdfPath?: string) => {
    try {
        const transporter = createTransporter();
        
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                .product-highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
                .cta-section { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
                .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>✅ Thank You for Your Interest!</h2>
                    <p>Your datasheet download was successful</p>
                </div>
                
                <div class="content">
                    <p>Dear ${userDetails.name},</p>
                    
                    <p>Thank you for downloading the technical datasheet for <strong>${productModel}</strong>. We appreciate your interest in our networking solutions.</p>
                    
                    <div class="product-highlight">
                        <h3>📄 Downloaded: ${productModel}</h3>
                        <p>You now have access to detailed technical specifications, features, and implementation guidelines for this product.</p>
                    </div>
                    
                    <div class="cta-section">
                        <h3>🤝 Need More Information?</h3>
                        <p>Our technical experts are ready to help you find the perfect networking solution for your requirements.</p>
                        <p><strong>Ready to discuss your project?</strong></p>
                    </div>
                    
                    <div class="contact-info">
                        <h3>📞 Get in Touch</h3>
                        <p><strong>Email:</strong> rizonntechnologies@gmail.com</p>
                        <p><strong>Website:</strong> <a href="https://rizonn.com">www.rizonn.com</a></p>
                        <p>We typically respond within 24 hours during business days.</p>
                    </div>
                    
                    <p>Best regards,<br>
                    <strong>RIZONN Technologies Team</strong><br>
                    <em>Your Network Infrastructure Partner</em></p>
                    
                    <div class="footer">
                        <p>This email was sent because you downloaded a datasheet from our website.<br>
                        If you have any questions, please don't hesitate to contact us.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userDetails.email,
            subject: `✅ Your ${productModel} Datasheet - RIZONN Technologies`,
            html: htmlContent,
            text: `
Dear ${userDetails.name},

Thank you for downloading the technical datasheet for ${productModel}!

We appreciate your interest in our networking solutions. The datasheet contains detailed technical specifications, features, and implementation guidelines for this product.

Need more information or have questions about implementation?
Our technical experts are ready to help you find the perfect networking solution.

Contact us:
Email: rizonntechnologies@gmail.com
Website: www.rizonn.com

We typically respond within 24 hours during business days.

Best regards,
RIZONN Technologies Team
Your Network Infrastructure Partner
            `.trim(),
            attachments: pdfPath
                ? [
                    {
                        filename: `Rizonn_Datasheet_${productModel}.pdf`,
                        path: pdfPath,
                    },
                ]
                : undefined
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ User confirmation email sent successfully');
        
    } catch (error) {
        console.error('❌ Failed to send user confirmation email:', error);
        // Don't throw error - we don't want to block the download if email fails
    }
};

// Map product models to their PDF filenames
const getPdfFilename = (model: string): string => {
    // PDF files have two naming patterns:
    // Regular products: "_Rizonn  Datasheet  NAV-[MODEL].pdf" (with underscore)
    // Access points: "Rizonn  Datasheet  NAV-[MODEL].pdf" (without underscore)
    
    // Access point controller models (without underscore prefix)
    const accessPointModels = [
        'NAV-50', 'NAV-100', 'NAV-500', 'NAV-1000', 'NAV-2500',
        'NAV-519-VA', 'NAV-219-VA', 'NAV-319-VA'
    ];
    
    // Handle special cases for models that might have different PDF names
    const modelMappings: { [key: string]: string } = {
        // Add any special mappings here if needed
        // 'NAV-C24S20': 'NAV-C24S2Q', // Example: if variant uses same PDF
    };

    if (model === 'U-5050') {
        return 'Rizonn UniBox U-5050 Datasheet.pdf';
    }

    if (model === 'NMS') {
        return 'Network Monitoring System.pdf';
    }

    if (model === 'HMS') {
        return 'HMS_Technical_Data_Sheet.pdf';
    }

    if (model === 'DCIM') {
        return 'DCIM.pdf';
    }

    if (model === 'UVSS') {
        return 'UVSS TDS-1.pdf';
    }
    
    const pdfModel = modelMappings[model] || model;
    
    // Use appropriate naming pattern based on product type
    if (accessPointModels.includes(pdfModel)) {
        return `Rizonn  Datasheet  ${pdfModel}.pdf`; // No underscore for access points
    } else {
        return `_Rizonn  Datasheet  ${pdfModel}.pdf`; // With underscore for regular products
    }
};

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();
        const { userDetails, productModel } = body;

        // Validate required fields
        if (!userDetails.name || !userDetails.email || !userDetails.company || !userDetails.phone || !userDetails.country) {
            return NextResponse.json(
                { error: 'All fields (name, email, company, phone, and country) are required' },
                { status: 400 }
            );
        }

        // Validate name format (only letters and spaces, 2-50 characters)
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        if (!nameRegex.test(userDetails.name.trim())) {
            return NextResponse.json(
                { error: 'Name must contain only letters and spaces (2-50 characters)' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(userDetails.email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Validate company name (minimum 4 characters, valid business characters)
        const companyRegex = /^[a-zA-Z0-9\s&.,'-]{4,100}$/;
        if (!companyRegex.test(userDetails.company.trim())) {
            return NextResponse.json(
                { error: 'Company name must be at least 4 characters and contain valid business characters' },
                { status: 400 }
            );
        }

        // Validate phone number
        if (!userDetails.phone.trim() || userDetails.phone.length < 10) {
            return NextResponse.json(
                { error: 'Please provide a valid phone number' },
                { status: 400 }
            );
        }

        // Validate country selection
        if (!userDetails.country.trim()) {
            return NextResponse.json(
                { error: 'Country selection is required' },
                { status: 400 }
            );
        }

        if (!productModel) {
            return NextResponse.json(
                { error: 'Product model is required' },
                { status: 400 }
            );
        }

        // Get the PDF filename
        const pdfFilename = getPdfFilename(productModel);
        const pdfPath = path.join(process.cwd(), 'public', 'datasheet-pdf', pdfFilename);

        // Check if the PDF file exists
        try {
            await fs.access(pdfPath);
        } catch (accessError) {
            console.error(`PDF file not found: ${pdfPath}`, accessError);
            
            // Provide specific error messages for temporarily unavailable files
            const temporarilyUnavailable = [
                'NAV-I-10R4S', 'NAV-I-8P2S', 'NAV-I-8R2S', 'NAV-D24R4S', 'NAV-1000'
            ];
            
            if (temporarilyUnavailable.includes(productModel)) {
                return NextResponse.json(
                    { error: `The datasheet for ${productModel} is currently being optimized for faster downloads. Please contact our sales team at rizonntechnologies@gmail.com for immediate access.` },
                    { status: 503 } // Service Temporarily Unavailable
                );
            }
            
            return NextResponse.json(
                { error: `Datasheet not available for ${productModel}. Please contact support at rizonntechnologies@gmail.com.` },
                { status: 404 }
            );
        }

        // Log the download request (for analytics/lead tracking)
        console.log('Datasheet Download Request:', {
            timestamp: new Date().toISOString(),
            productModel,
            userDetails: {
                name: userDetails.name,
                email: userDetails.email,
                company: userDetails.company,
                phone: userDetails.phone || 'Not provided',
                country: userDetails.country || 'Not provided'
            }
        });

        // Send email notifications (async - don't wait for them)
        sendDownloadNotification(userDetails, productModel).catch(error => {
            console.error('Admin email notification failed:', error);
        });
        
        sendUserConfirmation(userDetails, productModel, pdfPath).catch(error => {
            console.error('User confirmation email failed:', error);
        });

        // TODO: Here you could save the user details to a database for lead generation
        // Example:
        // await saveLeadToDatabase({
        //     ...userDetails,
        //     productModel,
        //     downloadedAt: new Date(),
        //     source: 'datasheet_download'
        // });

        // Read the PDF file
        const pdfBuffer = await fs.readFile(pdfPath);

        // Return the PDF file
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Rizonn_Datasheet_${productModel}.pdf"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error('Error in datasheet download API:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}

// Optional: Add GET method to list available datasheets
export async function GET() {
    try {
        const datasheetDir = path.join(process.cwd(), 'public', 'datasheet-pdf');
        const files = await fs.readdir(datasheetDir);
        
        const availableDatasheets = files
            .filter(file => file.endsWith('.pdf'))
            .map(file => {
                // Handle both naming patterns:
                // Regular products: "_Rizonn  Datasheet  NAV-[MODEL].pdf"
                // Access points: "Rizonn  Datasheet  NAV-[MODEL].pdf"
                let match = file.match(/^_Rizonn\s+Datasheet\s+(.+)\.pdf$/);
                if (match) {
                    return match[1]; // Regular product
                }
                
                match = file.match(/^Rizonn\s+Datasheet\s+(.+)\.pdf$/);
                if (match) {
                    return match[1]; // Access point controller
                }

                match = file.match(/^Rizonn\s+UniBox\s+(.+)\s+Datasheet\.pdf$/);
                if (match) {
                    return match[1]; // UniBox product
                }

                if (file === 'Network Monitoring System.pdf') {
                    return 'NMS';
                }

                if (file === 'UVSS TDS-1.pdf') {
                    return 'UVSS';
                }
                
                return file; // Fallback to full filename
            })
            .sort(); // Sort alphabetically

        return NextResponse.json({
            availableDatasheets,
            total: availableDatasheets.length,
            categories: {
                regularProducts: availableDatasheets.filter(model => 
                    !['NAV-50', 'NAV-100', 'NAV-500', 'NAV-1000', 'NAV-2500', 'NAV-519-VA', 'NAV-219-VA', 'NAV-319-VA', 'U-5050'].includes(model)
                ),
                accessPointControllers: availableDatasheets.filter(model => 
                    ['NAV-50', 'NAV-100', 'NAV-500', 'NAV-1000', 'NAV-2500', 'NAV-519-VA', 'NAV-219-VA', 'NAV-319-VA', 'U-5050'].includes(model)
                )
            }
        });

    } catch (error) {
        console.error('Error listing datasheets:', error);
        return NextResponse.json(
            { error: 'Failed to list available datasheets' },
            { status: 500 }
        );
    }
}
