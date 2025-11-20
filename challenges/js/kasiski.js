const fs = require("node:fs");

const alphaRegex = /^[A-Za-z]+$/;

const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

class Kasiski {
  constructor(ciphertext) {
    const splitCipheredText = ciphertext.split("");

    const specialCharacters = splitCipheredText.filter((char) => char.match(alphaRegex));
    this.specialCharactersMap = new Map();

    specialCharacters.forEach((character, index) => {
      this.specialCharactersMap.set(character, index);
    });

    const filteredText = splitCipheredText.filter((char) => char.match(alphaRegex)).join("").toUpperCase();

    this.ciphertext = filteredText;
    this.alphabet = alphabet;
  }

  findRepeatedSequences(seqLen = 3) {
    const similaritiesMap = new Map;

    for (let i=0; i < this.ciphertext.length; ++i)
    {
      const sliced = this.ciphertext.slice(i, i+seqLen);

      if (sliced.length < seqLen || similaritiesMap.has(sliced))
        continue;

      let repetitions = this.ciphertext.matchAll(sliced);

      const repetitions_indices = [];
      repetitions.forEach(repetition => {
        repetitions_indices.push(repetition.index);
      });

      if (repetitions_indices.length < 2)
        continue;

      similaritiesMap.set(sliced, repetitions_indices);
    }

    this.similaritiesMap = similaritiesMap;

    return similaritiesMap;
  }

  // Calcule les distances entre les positions des répétitions
  calculateDistances(repeatedSequences) {
    const distances = [];
    for (const positions of repeatedSequences.values()) {
      for (let i = 0; i < positions.length - 1; i++) {
        distances.push(positions[i + 1] - positions[i]);
      }
    }
    return distances;
  }

  // PGCD de deux entiers
  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  // Calcule les PGCDs de toutes les paires de distances
  findGCDs(distances) {
    const gcds = [];
    for (let i = 0; i < distances.length; i++) {
      for (let j = i + 1; j < distances.length; j++) {
        const g = this.gcd(distances[i], distances[j]);
        if (g > 1) {
          gcds.push(g);
        }
      }
    }
    return gcds;
  }

  // fin de la méthode Kasiski : Estimation des longueurs de clé possibles
  estimateKeyLengths() {
    const repeated = this.findRepeatedSequences();
    const distances = this.calculateDistances(repeated);
    const gcds = this.findGCDs(distances);

    const frequencyMap = new Map();
    for (const g of gcds) {
      frequencyMap.set(g, (frequencyMap.get(g) || 0) + 1);
    }

    return [...frequencyMap.entries()].sort((a, b) => b[1] - a[1]);
  }

  // Trouve la lettre la plus fréquente pour une position dans le bloc
  findMostUsedChar(position, keyLen) {
    const freq = {};
    for (let i = position; i < this.ciphertext.length; i += keyLen) {
      const char = this.ciphertext[i];
      freq[char] = (freq[char] || 0) + 1;
    }

    let mostCommon = '';
    let maxCount = 0;
    for (const [char, count] of Object.entries(freq)) {
      if (count > maxCount) {
        mostCommon = char;
        maxCount = count;
      }
    }
    return mostCommon;
  }

  // Trouve la clé probable selon une longueur donnée
  findKey(keyLength) {
    let key = '';
    for (let i = 0; i < keyLength; i++) {
      const letter = this.findMostUsedChar(i, keyLength);
      const shift = (this.alphabet.indexOf(letter) - this.alphabet.indexOf('E') + 26) % 26;
      key += this.alphabet[shift];
    }
    return key;
  }

  // Attaque automatique pour estimer la longueur de la clé
  attack() {
    const candidates = this.estimateKeyLengths();

    if (candidates.length >= 2) {
      console.log(`La clé fait probablement ${candidates[0][0]} ou ${candidates[1][0]} caractères.`);
    } else if (candidates.length === 1) {
      console.log(`La clé fait probablement ${candidates[0][0]} caractères.`);
    } else {
      console.log('Aucune séquence répétée trouvée.');
    }

    for (const [number, freq] of candidates) {
      console.log(`Facteur ${number} trouvé ${freq} fois`);
    }

    return candidates;
  }

  // Déchiffre le texte avec une clé donnée
  vigenereDecrypt(key) {
    const result = [];

    this.ciphertext.split("").forEach((letter, index) => {
        const letter_index = this.alphabet.findIndex(_letter => _letter == letter);
        const key_index = this.alphabet.indexOf(key[index % key.length]);

        result.push(this.alphabet[(letter_index - key_index + this.alphabet.length) % this.alphabet.length]);
    });

    let deciphered = result.join("");

    //a completer
    return deciphered;
  }
}

const ciphertext = fs.readFileSync("ch11.txt", "utf8");

// Analyse avec Kasiski
const kasiski = new Kasiski(ciphertext);
const candidates = kasiski.attack();

const key = kasiski.findKey(candidates[0][0]);
const decrypted = kasiski.vigenereDecrypt(key);
