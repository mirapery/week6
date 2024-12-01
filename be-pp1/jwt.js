const crypto = require("crypto");


function base64UrlEncode(data) {
    return Buffer.from(data)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function base64UrlDecode(encodedData) {
    const base64 = encodedData
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    return Buffer.from(base64, "base64")
        .toString();
}

function hash(header, payload, secret) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    return crypto
        .createHmac('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('hex');
}

function jwtSign(header = { alg: "HS256", typ: "JWT" }, payload, secret) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = hash(header, payload, secret);
    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
    return jwt;
}

function jwtVerify(token, secret) {
    const [ encodedHeader, encodedPayload, encodedSignature ] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) {
        return { valid: false, error: "Malformed token" };
    }

    const decodedHeader = JSON.parse(base64UrlDecode(encodedHeader));
    const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const newSignature = hash(decodedHeader, decodedPayload, secret);

    if (newSignature !== encodedSignature) {
        return { valid: false, error: "Invalid signature" };
    }
    return { valid: true, payload: payload };
}







// Example Usage
const header = { alg: "HS256", typ: "JWT" };
const payload = { userId: 123, userName: "Matti", }; 
const secret = crypto.randomBytes(64).toString("hex"); console.log("Generated Secret:", secret);
const token = jwtSign(header, payload, secret); console.log("JWT:", token);

console.log(jwtVerify(token, secret)); // Should print: { valid: true, payload: { userId: 123, userName: "Matti" } }
