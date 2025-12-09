import { Context } from 'koa';

export default {
  async submit(ctx: Context) {
    const { name, email, subject, message } = ctx.request.body || {};
    if (!name || !email || !subject || !message) {
      ctx.status = 400;
      ctx.body = { error: 'Missing required fields' };
      return;
    }

    try {
      const emailService = strapi.plugin('email').service('email');
      await emailService.send({
        to: process.env.CONTACT_TO || 'you@example.com',
        from: process.env.CONTACT_FROM || 'no-reply@example.com',
        subject: `[Contact] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      ctx.body = { ok: true };
    } catch (err) {
      strapi.log.error('Contact email failed', err);
      ctx.status = 500;
      ctx.body = { error: 'Email service not configured or failed' };
    }
  },
};
