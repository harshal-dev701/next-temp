import { Resend } from 'resend';

let resendClient: Resend | null = null;

const getResendClient = () => {
  // Try to get API key from environment variables first, then fallback to hardcoded key
  // TODO: Move this to environment variables for production
  const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY || '';
  
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not configured. Please set RESEND_API_KEY in your .env.local file.'
    );
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
};

interface SendOtpEmailParams {
  email: string;
  otp: string;
}

export const sendOtpEmail = async ({ email, otp }: SendOtpEmailParams) => {
  try {
    const resend = getResendClient();
    // Use the default Resend domain for testing
    const fromEmail = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const result = await resend.emails.send({
      from: fromEmail,
      to: email, // Can be string or array
      subject: 'Your Password Reset Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Verification</h1>
          </div>
          <div style="padding: 30px; background: #ffffff;">
            <p style="margin: 0 0 20px; color: #334155;">Use the verification code below to reset your password. The code expires in 10 minutes.</p>
            <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <div style="font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #2563eb; font-family: 'Courier New', monospace;">${otp}</div>
            </div>
            <p style="margin: 20px 0 0; color: #64748b; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated message, please do not reply.</p>
          </div>
        </div>
      `
    });


    if (result.error) {
      console.error('Resend API error details:', result.error);
      const errorMessage = result.error.message || JSON.stringify(result.error);
      throw new Error(`Failed to send OTP email: ${errorMessage}`);
    }

    return true;
  } catch (error: any) {
    console.error('Error in sendOtpEmail - Full error:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    throw new Error(error?.message || 'Failed to send OTP email');
  }
};

export default sendOtpEmail;

