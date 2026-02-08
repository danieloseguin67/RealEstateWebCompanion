// Simple encryption utility for password storage
// Note: For production use, implement server-side hashing with bcrypt/argon2

export class CryptoUtil {
  private static readonly SECRET_KEY = 'RealEstate2026Secret';

  /**
   * Encrypts a password using a simple XOR cipher with base64 encoding
   */
  static encrypt(text: string): string {
    const encrypted = this.xorCipher(text, this.SECRET_KEY);
    return btoa(encrypted); // Base64 encode
  }

  /**
   * Decrypts a password that was encrypted with the encrypt method
   */
  static decrypt(encryptedText: string): string {
    try {
      const decoded = atob(encryptedText); // Base64 decode
      return this.xorCipher(decoded, this.SECRET_KEY);
    } catch {
      return ''; // Return empty string if decryption fails
    }
  }

  /**
   * XOR cipher for simple encryption/decryption
   */
  private static xorCipher(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }
}
