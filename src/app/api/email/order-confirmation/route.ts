import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, customerName, orderId, items, total, halfAmount, mpesaReceiptNumber } = await request.json();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 20px; font-weight: bold; color: #ec4899; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Order Confirmed!</h1>
              <p>Thank you for shopping with Modern Fashion Hub</p>
            </div>
            <div class="content">
              <p>Dear ${customerName},</p>
              <p>Your order has been confirmed and payment received successfully!</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> #${orderId?.slice(0, 12)}</p>
                <p><strong>M-Pesa Receipt:</strong> ${mpesaReceiptNumber || 'Pending'}</p>
                
                <h4 style="margin-top: 20px;">Items:</h4>
                ${items?.map((item: any) => `
                  <div class="item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>KSh ${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                `).join('')}
                
                <div class="total">
                  <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                    <span>Paid (50%):</span>
                    <span style="color: #10b981;">KSh ${halfAmount?.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; color: #f59e0b;">
                    <span>Balance (Pay on Delivery):</span>
                    <span>KSh ${(total - halfAmount)?.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 2px solid #e5e7eb;">
                    <span>Total:</span>
                    <span>KSh ${total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <h3>📦 What's Next?</h3>
              <ul>
                <li>✓ Your order is being processed</li>
                <li>✓ We'll contact you shortly for delivery confirmation</li>
                <li>✓ Pay the remaining 50% on delivery</li>
                <li>✓ Enjoy your purchase!</li>
              </ul>
              
              <p>Need help? Contact us:</p>
              <p>📱 WhatsApp: +254 790 228 698<br>
              📞 Phone: +254 710 782 380<br>
              📧 Email: info@modernfashionhub.co.ke</p>
            </div>
            <div class="footer">
              <p>Modern Fashion Hub - Your Fashion Destination in Kenya</p>
              <p>Kisii Town, Next to Shivling Supermarket</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'orders@modernfashionhub.co.ke',
      to: customerEmail,
      subject: `Order Confirmation #${orderId?.slice(0, 8)} - Modern Fashion Hub`,
      html: emailHtml,
    });

    if (error) {
      console.error('Email Error:', error);
      return NextResponse.json({ success: false, error });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Email Send Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}