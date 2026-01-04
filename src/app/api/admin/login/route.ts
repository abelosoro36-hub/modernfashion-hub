import { NextRequest, NextResponse } from 'next/server';

// CHANGE THESE CREDENTIALS FOR SECURITY!
const 
ADMIN_CREDENTIALS = {
  email: 'abelosoro@modernfashionhub.co.ke',
  password: 'Abel@0790', // Change this!
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        admin: {
          email: email,
          name: 'Admin',
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}