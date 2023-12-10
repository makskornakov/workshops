import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import MagicLinkEmail from './magicLink';

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
// export async function sendVerification(params: Params) {
//   const { identifier, url, provider } = params;
//   const { host } = new URL(url);
//   // NOTE: You are not required to use `nodemailer`, use whatever you want.
//   const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);
//   try {
//     const data = await resend.emails.send({
//       to: identifier,
//       from: provider.from,
//       subject: `Sign in to ${host}`,
//       text: text({ url, host }),
//       react: MagicLinkEmail({ url, host }),
//     });
//     if (data.error) {
//       throw new Error('Configuration');
//     }
//     console.log('result', data);
//     // return { success: true, data };
//   } catch (error) {
//     console.log('error', error);
//     throw new Error('failes to send email');
//   }
// }

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
