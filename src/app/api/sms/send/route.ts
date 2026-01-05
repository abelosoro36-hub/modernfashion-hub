import { NextRequest, NextResponse } from 'next/server';
import AfricasTalking from 'africastalking';

const africastalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY || '',
  username: process.env.AFRICASTALKING_USERNAME || 'sandbox',
});

const sms = africastalking.SMS;

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, message } = await request.json();

    // Format phone number for Africa's Talking
    let formattedPhone = phoneNumber.replace(/^0/, '+254');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }

    const result = await sms.send({
      to: [formattedPhone],
      message: message,
      from: process.env.AFRICASTALKING_SENDER_ID || '',
    });

    console.log('SMS Sent:', result);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('SMS Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}