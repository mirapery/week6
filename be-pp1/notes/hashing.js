const crypto = require("crypto");


function hash(header, payload, secret) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    // Header ja payload muunnetaan JSON-muotoon
    // Teksti enkoodataan Base64URL-standardin mukaisesti
    // Tämä varmistaa yhteensopivuuden JWT-standardien kanssa

    return crypto
        .createHmac('sha256', secret)                   // Luo HMAC-objekti SHA-256-hajautusalgoritmilla
        .update(`${encodedHeader}.${encodedPayload}`)   // Lisää data
        .digest('hex');                                 // Luo hajautus hexadesimaalimuodossa
}

// Test
const header1 = { alg: "HS256", typ: "JWT" };
const payload1 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
const secret1 = "my-secret-key";

console.log("Hash:", hash(payload1, secret1, header1));
