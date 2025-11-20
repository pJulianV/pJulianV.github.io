// Encryption mapping
const encryptionMap = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const decryptionMap = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

function validateInput(text) {
    // Check for lowercase only and no accents
    const regex = /^[a-z\s]*$/;
    return regex.test(text);
}

function encriptar() {
    const inputText = document.getElementById("texto").value.trim();
    
    if (!inputText) {
        alert("Por favor ingresa un texto");
        return;
    }
    
    if (!validateInput(inputText)) {
        alert("Solo se permiten letras minúsculas sin acentos");
        return;
    }
    
    let encryptedText = inputText;
    for (let [key, value] of Object.entries(encryptionMap)) {
        encryptedText = encryptedText.replaceAll(key, value);
    }
    
    document.getElementById("textarea").value = encryptedText;
}

function desencriptar() {
    const inputText = document.getElementById("texto").value.trim();
    
    if (!inputText) {
        alert("Por favor ingresa un texto");
        return;
    }
    
    let decryptedText = inputText;
    // Decrypt in reverse order (longer patterns first to avoid partial replacements)
    for (let [key, value] of Object.entries(decryptionMap)) {
        decryptedText = decryptedText.replaceAll(key, value);
    }
    
    document.getElementById("textarea").value = decryptedText;
}

