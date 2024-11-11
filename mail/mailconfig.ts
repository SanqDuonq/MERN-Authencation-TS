import {MailtrapClient} from 'mailtrap'
import dotenv from 'dotenv'

dotenv.config()
const token = process.env.MAILTRAP_TOKEN as string
const senderEmail = 'mailtrap@demomailtrap.com'

export const mailClient = new MailtrapClient({token: token})

export const sender = {name: 'NamSang', email: senderEmail}