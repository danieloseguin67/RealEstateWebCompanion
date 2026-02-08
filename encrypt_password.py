#!/usr/bin/env python3
"""
Password Encryption Utility
Encrypts passwords using the same algorithm as the Angular app
"""

import base64


class CryptoUtil:
    """Encryption utility matching the TypeScript implementation"""
    
    SECRET_KEY = "RealEstate2026Secret"
    
    @staticmethod
    def encrypt(text: str) -> str:
        """Encrypts a password using XOR cipher with base64 encoding"""
        encrypted = CryptoUtil._xor_cipher(text, CryptoUtil.SECRET_KEY)
        return base64.b64encode(encrypted.encode('latin-1')).decode('utf-8')
    
    @staticmethod
    def decrypt(encrypted_text: str) -> str:
        """Decrypts a password that was encrypted with the encrypt method"""
        try:
            decoded = base64.b64decode(encrypted_text).decode('latin-1')
            return CryptoUtil._xor_cipher(decoded, CryptoUtil.SECRET_KEY)
        except Exception:
            return ''
    
    @staticmethod
    def _xor_cipher(text: str, key: str) -> str:
        """XOR cipher for simple encryption/decryption"""
        result = ''
        for i in range(len(text)):
            char_code = ord(text[i]) ^ ord(key[i % len(key)])
            result += chr(char_code)
        return result


def main():
    """Main function to encrypt passwords"""
    print("=" * 50)
    print("Real Estate Companion - Password Encryption Tool")
    print("=" * 50)
    print()
    
    while True:
        password = input("Enter password to encrypt (or 'quit' to exit): ").strip()
        
        if password.lower() in ['quit', 'exit', 'q']:
            print("\nGoodbye!")
            break
        
        if not password:
            print("Error: Password cannot be empty!\n")
            continue
        
        encrypted = CryptoUtil.encrypt(password)
        decrypted = CryptoUtil.decrypt(encrypted)
        
        print(f"\nOriginal Password:  {password}")
        print(f"Encrypted:          {encrypted}")
        print(f"Verification:       {decrypted}")
        print(f"Match:              {'✓ Yes' if password == decrypted else '✗ No'}")
        print("-" * 50)
        print()


if __name__ == "__main__":
    main()
