import string

key = "Mystere"

charset = list(string.ascii_uppercase)
charset.remove("W")

charset_length = len(charset)

def build_alphabet():
    global key

    def build_correct_word(key_p):
        cle = ""

        for letter in key_p:
            if letter != "W" and letter not in cle:
                cle += letter
        
        return list(cle)

    alphabet = [["" for x in range(5)] for p in range (5)]
    word = build_correct_word(key.upper())
    
    word_index = 0
    word_length = len(word)
    alphabet_index = 0

    for ligne in range(5):
        for colonne in range(5):
            if word_index < word_length:
                alphabet[ligne][colonne] = word[word_index]
                charset.remove(word[word_index])
                word_index += 1
                continue

            alphabet[ligne][colonne] = charset[0]
            charset.remove(charset[0])

    return alphabet

alphabet = build_alphabet()

def get_index_from_alphabet(alphabet, letter):
    for i, row in enumerate(alphabet):
        if letter in row:
            return f"{i+1}{row.index(letter)+1}"

def encrypt_polybe(word):
    global key
    global alphabet

    word = word.upper()
    encrypted = []

    for letter in word:
        if (letter.isalpha()): 
            """ encrypted.append(next((str(i+1) + str(sublist.index(letter)+1) for i, sublist in enumerate(alphabet) if letter in sublist))) """
            letter_index = get_index_from_alphabet(alphabet, letter)
            encrypted.append(int(letter_index))
        else:
            encrypted.append(letter)
    
    return encrypted

def decrypt_polybe(encrypted_word):
    global alphabet

    decrypted = ""

    for encrypted_digits in encrypted_word:
        if type(encrypted_digits) is int:
            encrypted_digits = str(encrypted_digits)
            decrypted += alphabet[int(encrypted_digits[0])-1][int(encrypted_digits[-1])-1]
        else:
            decrypted += str(encrypted_digits)

    return decrypted

#encrypted = encrypt_polybe("salut les tepos")
#decrypted = decrypt_polybe(encrypted)

#print(encrypted)
#print(decrypted)
