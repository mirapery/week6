
function jwtVerify(token, secret) {
    const [ encodedHeader, encodedPayload, encodedSignature ] = token.split(".");

    if (!encodedHeader || !encodedPayload || !encodedSignature) {
        return { valid: false, error: "Malformed token" };
    }

    // Decode the JWT
    const decodedHeader = JSON.parse(base64UrlDecode(encodedHeader));
    const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const decodedSignature = JSON.parse(base64UrlDecode(encodedSignature));

    // Recreate the signature and compare it with the one in the token
    const newSignature = hash(decodedHeader, decodedPayload, secret);

    // Check for malformed or tampered tokens
    if (newSignature !== encodedSignature) {
        return { valid: false, error: "Invalid signature" };
    }

    return { valid: true, payload: payload };
}

console.log(jwtVerify(token, secret)); // Should return: { valid: true, payload: { userId: 123, userName: "Matti" } }