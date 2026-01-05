import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, orderId } = await request.json();

    // Get access token
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mpesa/token`);
    const tokenData = await tokenResponse.json();

    if (!tokenData.success) {
      throw new Error('Failed to get M-Pesa access token');
    }

    const access_token = tokenData.access_token;
    const environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    const shortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    
    // Generate password
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // Format phone number (remove leading 0 or +, ensure 254 prefix)
    let formattedPhone = phoneNumber.replace(/^(\+?254|0)/, '254');
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const url = environment === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const requestBody = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference || 'ModernFashionHub',
      TransactionDesc: `Payment for Order #${orderId?.slice(0, 8) || 'NEW'}`,
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'STK Push sent successfully',
      data: response.data,
    });
  } catch (error: any) {
    console.error('STK Push Error:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.response?.data?.errorMessage || 'Failed to initiate payment' 
      },
      { status: 500 }
    );
  }
}