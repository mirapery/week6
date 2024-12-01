// MY ATTEMPT

// 1. Parse the JWT using .split() -method
const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const jwtArray = sampleJwt.split(".");
const [header, payload, signature] = jwtArray;

// Decode strings
const decodedHeader = atob(header);
const decodedPayload = atob(payload);

// Encode strings
const encodedHeader = btoa(decodedHeader);
const encodedPayload = btoa(decodedPayload);

// Notes from LLM:
//  atob and btoa are not Base64URL compatible
//  Doesn't replace characters



// FIXED VERSION (WITH LLM)

function base64UrlEncode(data) {
    return btoa(data)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function base64UrlDecode(encodedData) {
    const base64 = encodedData
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    return atob(base64);
}

// Notes:
//  You can use atob and btoa if you replace the Base64URL special characters
//  btoa ja atob ovat perinteisesti saatavilla selaimissa



// PROVIDED ANSWER

function base64UrlEncode(data) {
    return Buffer.from(data)            // Luo binääridatan Buffer-objektin annetusta tekstistä
        .toString("base64")             // Muuttaa bufferin Base64-merkkijonoksi
        .replace(/=/g, "")              // Poista = merkki
        .replace(/\+/g, "-")            // Korvaa + merkki - merkillä
        .replace(/\//g, "_");           // Korvaa / merkki _ merkillä
}

function base64UrlDecode(encodedData) {
    const base64 = encodedData
        .replace(/-/g, "+")             // Korvaa - merkki + merkillä
        .replace(/_/g, "/");            // Korvaa _ merkki / merkillä
    return Buffer.from(base64, "base64")    // Muuta Base64-merkkijono binääridataksi
        .toString();                    // Muuta binääridata tekstiksi
}

// Test
console.log("Encoded Data:", base64UrlEncode("hello"));
console.log("Decoded Data:", base64UrlDecode("aGVsbG8"));

// Notes:
//  Buffer on laajemmin käytetty ja sopii Base64URL:n kanssa
//  Buffer sopii erityisesti palvelinpuolen koodiin, käytä sitä jatkossa