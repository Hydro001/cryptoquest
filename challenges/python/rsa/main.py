from encode import *
from decode import *
from utils import *

def get_message():
    return (input("entrer votre message : \n"))

def string_to_ascii(message):
    letter_array = []

    for letter in message:
        letter_array.append(ord(letter))

    return letter_array

################### EXEMPLE ###################

n = int(input("Donnez la valeur de n : "))
phi = int(input("Donnez la valeur de phi : "))

# Trouvons la somme p + q
S = n - phi + 1

# Résolvons le polynôme x² - Sx + n = 0
p, q = racine(1, -S, n)

print(f"p = {p}, q = {q}")

e = randint(1,50)
while find_prime_number(e,phi) == False:
    e = randint(1,50)

d = find_d(e,phi)
print("d = ",d) 


print(f"Clé publique: (n,e) = {(n,e)}")
message = get_message()
print("Bob : (encode son message)")
ascii_message = string_to_ascii(message)
encoded_message = encode_message(ascii_message,n,e)
print ("Bob ------------------> Alice")

print("Alice : (decode le message)")
print(f"Clé privée: (n,d) = {(n,d)}")
decoded_message = decode_message(encoded_message, n, d)
print(''.join(x for x in decoded_message))
print("Bob <------------------ Alice")
