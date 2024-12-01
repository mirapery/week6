// Never build JWT from scratch in real applications
// Always use libraries like jsonwebtoken

//npm install jsonwebtoken

const jwt = require("jsonwebtoken");

const token = jwt.sign(payload, secret, { expiresIn: "1h" });
const decoded = jwt.verify(token, secret);
console.log(decoded);