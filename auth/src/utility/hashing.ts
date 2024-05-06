import {scrypt, randomBytes } from 'crypto'
import {promisify} from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
  public static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex')
    const buffer = await scryptAsync(password,salt,64) as Buffer
    return `${buffer.toString('hex')}.${salt}`
 }

 public static async compare(stroedPassword:string, passwordToVerify:string)
 {
   const [hashedPassword,salt] = stroedPassword.split('.')
   const buf = await scryptAsync(passwordToVerify,salt,64) as Buffer
   return buf.toString('hex') === hashedPassword
 }

}