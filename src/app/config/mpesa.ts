// M-PESA DARAJA API CONFIGURATION
// Get your credentials from: https://developer.safaricom.co.ke/

export const MPESA_CONFIG = {
  // CHANGE THESE TO YOUR ACTUAL CREDENTIALS
  CONSUMER_KEY: 'AnnNF3nb7TGtzgLFCzgiQKGK0cAOOO6AIBDxBtuoh3Fwjtep',
  CONSUMER_SECRET: 'jJNXy8f9e0JENIjOO0LG3oX1LxUQS5AGokcG6orb8kBWy1IvIdVE1HkntbzJjfKK',
  BUSINESS_SHORT_CODE: 'YOUR_BUSINESS_SHORTCODE', // e.g., 174379 for sandbox, your actual shortcode for production
  PASSKEY: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  
  // Callback URLs - Replace with your actual domain
  CALLBACK_URL: 'https://yourdomain.com/api/mpesa/callback',
  
  // API URLs
  SANDBOX_URL: 'https://sandbox.safaricom.co.ke',
  PRODUCTION_URL: 'https://api.safaricom.co.ke',
  
  // Use sandbox for testing, production for live
  ENVIRONMENT: 'sandbox', // Change to 'production' when going live
};

// Helper function to get base URL
export function getMpesaBaseUrl() {
  return MPESA_CONFIG.ENVIRONMENT === 'sandbox' 
    ? MPESA_CONFIG.SANDBOX_URL 
    : MPESA_CONFIG.PRODUCTION_URL;
}