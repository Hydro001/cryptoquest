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

const freq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let result = [];

function chiffrement_frequence_dynamique(text) {
    for (i=0; i<text.length; ++i) {
        if (text[i] != " ") {
            const alphanum_code = alphabet.findIndex(letter => letter == text[i]);
            freq[alphanum_code] += 1;
            const padding = (alphanum_code + freq[alphanum_code])%26;
            const ciphered_letter = alphabet[padding];
            result.push(ciphered_letter);
        }
        else {
            result.push(" ");
        }
    }

    console.log(result.join(""));
}

//chiffrement_frequence_dynamique("SCIENCES INFORMATIQUES");
