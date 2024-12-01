
// Create a JWT


function jwtSign(header = { alg: "HS256", typ: "JWT" }, payload, secret) {

    // Encode the header and payload using Base64URL
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Generate a signature using the hash function
    const signature = hash(payload, secret, header);

    // Combine all parts to create the JWT
    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
    return jwt;
}


const header = { alg: "HS256", typ: "JWT" };
const payload = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
const secret = "crypto.randomBytes(64).toString('hex')";