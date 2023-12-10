import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import MagicLinkEmail from './MagicLink';

interface Params {
  identifier: string;
  url: string;
  provider: {
    server: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
}

export async function sendVerification(params: Params) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);
  const result = await resend.emails.send({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: await renderAsync(MagicLinkEmail({ url, host })),
  });
  if (result.error) {
    throw new Error(`Email(s) (${result.error.message}) could not be sent: ${result.error.name}`);
  }
}

// /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
