const crypto = require("crypto");

// Function to hash a password using HMAC-SHA256 (no salt)
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

console.log("The hash for 'HelloWorld!' is:",hashPassword("HelloWorld!"));
console.log("Normally, the 'hashPassword()' function is called offline by the attacker, but in this simulation, it is included here for illustration purposes. It is not used in the code below");
console.log("");

// Simulate a leaked table with username-hash pairs (no plain-text passwords)
const leakedTable = [
  {
    username: "user1",
    hash: "741bfdda32c0281832bb6fb08a00c77a3f0d5fb05040abeff02313faa634e3a3", //hashPassword("p@ssword12345")
  },
  {
    username: "user2",
    hash: "fdfcc1d7c5352e52b288e75b8e91865d54132bd7398b99d7ce72f2ce6d2a2a2c", //hashPassword("R#wdf78>$12")
  },
  {
    username: "user3",
    hash: "f59ce04dd8baca6d6c47b45f24a87ddc7851f3b94762fe31b7a2e444c592028a", //hashPassword("Ilovecats")
  },
  {
    username: "user4",
    hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", //hashPassword("admin")
  },
  {
    username: "user5",
    hash: "f4e98344541784f2eabcf6fcd1daf050afd9a1bfa2c59819356fe0543752f311", //hashPassword("Ab123456")
  },
];

// List of potential passwords an attacker might try (includes leaked passwords with their hashes)
const possiblePasswords = [
  {
    password: 'letmein',
    hash: '1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032' //hashPassword("letmein")
  },
  {
    password: 'R#wdf78>$12',
    hash: 'fdfcc1d7c5352e52b288e75b8e91865d54132bd7398b99d7ce72f2ce6d2a2a2c' //hashPassword("R#wdf78>$12")
  },
  {
    password: 'abc123',
    hash: '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090'
  },
  {
    password: 'welcome',
    hash: '280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02'
  },
  {
    password: 'dragon',
    hash: 'a9c43be948c5cabd56ef2bacffb77cdaa5eec49dd5eb0cc4129cf3eda5f0e74c'
  },
  {
    password: 'football',
    hash: '6382deaf1f5dc6e792b76db4a4a7bf2ba468884e000b25e7928e621e27fb23cb'
  },
  {
    password: 'sunshine',
    hash: 'a941a4c4fd0c01cddef61b8be963bf4c1e2b0811c037ce3f1835fddf6ef6c223'
  },
  {
    password: 'whatever',
    hash: '85738f8f9a7f1b04b5329c590ebcb9e425925c6d0984089c43a022de4f19c281'
  },
  {
    password: 'trustno1',
    hash: '203b70b5ae883932161bbd0bded9357e763e63afce98b16230be33f0b94c2cc5'
  },
  {
    password: 'hello',
    hash: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
  },
  {
    password: 'password123',
    hash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'
  },
  {
    password: 'qwerty',
    hash: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5'
  },
  {
    password: 'Ilovecats',
    hash: 'f59ce04dd8baca6d6c47b45f24a87ddc7851f3b94762fe31b7a2e444c592028a'
  },
  {
    password: 'admin',
    hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
  },
  {
    password: '123456',
    hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  },
  {
    password: 'test',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    password: 'guest',
    hash: '84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec'
  },
  {
    password: 'password',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    password: '1234',
    hash: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'
  },
  {
    password: 'love',
    hash: '686f746a95b6f836d7d70567c302c3f9ebb5ee0def3d1220ee9d4e9f34f5e131'
  },
  {
    password: 'qwertyuiop',
    hash: '9a900403ac313ba27a1bc81f0932652b8020dac92c234d98fa0b06bf0040ecfd'
  },
  {
    password: '123123',
    hash: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'
  },
  {
    password: 'password1',
    hash: '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e'
  },
  {
    password: 'iloveyou',
    hash: 'e4ad93ca07acb8d908a3aa41e920ea4f4ef4f26e7f86cf8291c5db289780a5ae'
  },
  {
    password: '123qwe',
    hash: 'fbfb386efea67e816f2dda0a8c94a98eb203757aebb3f55f183755a192d44467'
  },
  {
    password: '1q2w3e4r',
    hash: '72ab994fa2eb426c051ef59cad617750bfe06d7cf6311285ff79c19c32afd236'
  },
  {
    password: 'welcome123',
    hash: 'a68349561396ec264a350847024a4521d00beaa3358660c2709a80f31c7acdd0'
  },
  {
    password: 'letmein123',
    hash: '9b0eb22aef89516d6fb4b31ccf008a68abe0d10a3fc606316389613eccf96854'
  }
]


// Function to simulate the attack
function recoverPasswords(leakedTable, possiblePasswords) {
  const recovered = [];

  // Loop through each entry in the leaked table
  leakedTable.forEach((entry) => {
    // Loop through the possible passwords
    for (const passwordObj of possiblePasswords) {
      const hashAttempt = passwordObj.hash; // Hash from possiblePasswords array
      if (hashAttempt === entry.hash) {
        recovered.push({
          username: entry.username,
          matchedPassword: passwordObj.password, // The password matched by the hash
        });
        break; // Stop once the correct password is found
      }
    }
  });

  return recovered;
}

// Perform the recovery simulation
const recoveredPasswords = recoverPasswords(leakedTable, possiblePasswords);

// Output Results
console.log("Leaked Table (Username-Hash Pairs):");
leakedTable.forEach((entry) =>
  console.log(`Username: ${entry.username}, Hash: ${entry.hash}`)
);

console.log("\nRecovered Passwords:");
recoveredPasswords.forEach((rec) =>
  console.log(
    `Recovered: ${rec.username}'s password is "${rec.matchedPassword}"`
  )
);

console.log(
  "\nNote: if we use bcrypt, this attack is not possible because of salting"
);