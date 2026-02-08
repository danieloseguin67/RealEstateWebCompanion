import base64

SECRET_KEY = 'RealEstate2026Secret'

def xor_cipher(text, key):
    result = ''
    for i in range(len(text)):
        char_code = ord(text[i]) ^ ord(key[i % len(key)])
        result += chr(char_code)
    return result

def decrypt(encrypted_text):
    decoded = base64.b64decode(encrypted_text).decode('latin-1')
    return xor_cipher(decoded, SECRET_KEY)

passwords = [
    ('jane.doe', 'HwYRCh4dOC4oVwQLJQ=='),
    ('daniel.seguin', 'FgQLASAHRlFGRw=='),
    ('jessica.larmour', 'MQAXXn0/ERdQ')
]

print('\nAll user credentials:')
print('=' * 50)
for user, enc_pwd in passwords:
    dec_pwd = decrypt(enc_pwd)
    print(f'Username: {user}')
    print(f'Password: {dec_pwd}')
    print('-' * 50)
