import Crypto from 'crypto-js'

class Encrypt {
  encryptHandler(message: string, key: string) {
    return Crypto.AES.encrypt(message, key).toString()
  }
  decryptHandler(cipher: string, key: string) {
    return Crypto.AES.decrypt(cipher, key).toString(Crypto.enc.Utf8)
  }
}

export default new Encrypt()
