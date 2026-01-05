import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const consumer_key = process.env.MPESA_CONSUMER_KEY;
    const consumer_secret = process.env.MPESA_CONSUMER_SECRET;
    const environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    
    const url = environment === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return NextResponse.json({ 
      success: true, 
      access_token: response.data.access_token 
    });
  } catch (error: any) {
    console.error('M-Pesa Token Error:', error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to get access token' },
      { status: 500 }
    );
  }
}