import Mailchimp from '@mailchimp/mailchimp_marketing'

export const client = Mailchimp

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})
