import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('M-Pesa Callback Received:', JSON.stringify(body, null, 2));

    const { Body } = body;
    const { stkCallback } = Body;

    if (stkCallback.ResultCode === 0) {
      // Payment successful
      const { CallbackMetadata } = stkCallback;
      const metadata = CallbackMetadata.Item;

      const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value;

      console.log('Payment Successful:', {
        amount,
        mpesaReceiptNumber,
        phoneNumber,
      });

      // Here you would:
      // 1. Update order in database
      // 2. Send confirmation email
      // 3. Send confirmation SMS

      // Send confirmation email
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/email/order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: stkCallback.CheckoutRequestID,
          mpesaReceiptNumber,
          amount,
          phoneNumber,
        }),
      });

      // Send confirmation SMS
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          message: `Payment of KSh ${amount} received! Receipt: ${mpesaReceiptNumber}. Your order will be delivered soon. - Modern Fashion Hub`,
        }),
      });

    } else {
      // Payment failed
      console.log('Payment Failed:', stkCallback.ResultDesc);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Callback Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}