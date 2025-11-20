def decode_message(encoded_message, n, d):
    """Déchiffre une liste d'entiers RSA en texte"""
    decoded_ascii = [pow(c, d, n) for c in encoded_message]
    decoded_text = ''.join(chr(x) for x in decoded_ascii)
    return decoded_text
