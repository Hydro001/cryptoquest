from math import sqrt
from random import randint

def racine(a,b,c):
    def discriminant(a,b,c):
        return (b**2 - 4 * a * c)

    delta = discriminant(a,b,c)
    if (delta > 0):
        return ((-b+sqrt(delta))/(2*a),(-b-sqrt(delta))/2*a)
    elif (delta == 0):
        return (-b/2*a)
    else:
        return

def find_d(e,phi):
    def euclide(a,b):
        if b == 0:
            return a, 1, 0
        else:
            d,u,v = euclide(b, a % b)
            return (d,v,u - (a//b)*v)

    g,u,v = euclide(e, phi)
    if g != 1:
        return "Erreur: Pas premiers entre eux"
    else:
        d = u % phi
    return d

def find_prime_number(e,phi):
    def euclide(a,b):
        if b == 0:
            return a, 1, 0
        else:
            d,u,v = euclide(b, a % b)
            return (d,v,u - (a//b)*v)

    g,u,v = euclide(e, phi)
    if g != 1:
        return False
