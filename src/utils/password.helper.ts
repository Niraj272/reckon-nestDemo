import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
export interface Sha512Interface {
  salt: string;
  passwordHash: string;
}
const saltRounds = 10;
@Injectable()
export class PasswordHelper {
  public compare(plainPassword: string, passwordhash: string): Promise<boolean | object> {
    return new Promise((resolve, reject) => {
      compare(plainPassword, passwordhash, (err, res) => {
        if (res) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }
  public async generateSaltAndHash(userPassword: string): Promise<Sha512Interface> {
    const salt: string = (await this.generateSalt()) as string;
    /** Gives us salt of length 16 */
    const passwordHash: string = (await this.hash(userPassword, salt)) as string;
    return {
      salt,
      passwordHash,
    };
  }
  public generateSalt(round: number = saltRounds): Promise<string | null> {
    return new Promise((resolve) => {
      genSalt(round, (err, salt) => {
        if (!err) {
          resolve(salt);
        } else {
          resolve(null);
        }
      });
    });
  }
  public hash(plainPassword: string, salt: string): Promise<string> {
    return new Promise((resolve) => {
      hash(plainPassword, salt, (err, hash) => {
        if(err){
          resolve(null);
        }
        resolve(hash);
      });
    });
  }
}