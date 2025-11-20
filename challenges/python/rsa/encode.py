def encode_message(message, n, e):
    """Chiffre une chaîne de texte en utilisant RSA"""
    encoded = [pow(m, e, n) for m in message]
    return encoded
