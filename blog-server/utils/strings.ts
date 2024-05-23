import crypto from 'crypto'
const secret = "fintech_blog"


export const generateRandomString = () => crypto.randomBytes(128).toString('base64');

export  function authentication(salt: string, password: string): string {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex')
}