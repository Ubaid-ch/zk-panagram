export const abi = [
  {
    "inputs": [
      {
        "internalType": "contract IVerifier",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },

  /* ─────────────── Custom Read Functions ─────────────── */

  {
    "inputs": [],
    "name": "contractURI",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentRoundStatus",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentPanagram",
    "outputs": [
      { "internalType": "bytes32", "name": "", "type": "bytes32" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  /* ─────────────── Game Logic ─────────────── */

  {
    "inputs": [
      { "internalType": "bytes32", "name": "_correctAnswer", "type": "bytes32" }
    ],
    "name": "newRound",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes", "name": "proof", "type": "bytes" }
    ],
    "name": "makeGuess",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "contract IVerifier", "name": "_verifier", "type": "address" }
    ],
    "name": "setVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  /* ─────────────── Public State Variables (Auto-Getters) ─────────────── */

  {
    "inputs": [],
    "name": "s_verifier",
    "outputs": [
      { "internalType": "contract IVerifier", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_currentRound",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_currentRoundWinner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "s_winnerWins",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "s_lastCorrectGuessRound",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_answer",
    "outputs": [
      { "internalType": "bytes32", "name": "", "type": "bytes32" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_DURATION",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_roundStartTime",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  /* ─────────────── Events ─────────────── */

  {
    "anonymous": false,
    "inputs": [],
    "name": "Panagram__RoundStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "winner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "Panagram__NFTMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "contract IVerifier", "name": "verifier", "type": "address" }
    ],
    "name": "Panagram__VerifierUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "bool", "name": "result", "type": "bool" }
    ],
    "name": "Panagram__ProofSucceeded",
    "type": "event"
  }
] as const;