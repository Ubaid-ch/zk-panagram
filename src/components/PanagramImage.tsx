import { ANAGRAM } from "../constant";

export default function PanagramImage() {
  // Split letters
  const letters = ANAGRAM.split("");

  // Shuffle letters randomly
  const shuffledLetters = [...letters];
  for (let i = shuffledLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
  }

  return (
    <div className="panagram-image-container">
      <div className="scramble-header">
        <h3 className="scramble-title">Unscramble the Word</h3>
        <p className="scramble-hint">Rearrange these letters to find the secret word</p>
      </div>
      
      <div className="letter-grid">
        {shuffledLetters.map((letter, index) => (
          <div
            key={index}
            className="letter-tile"
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: `rotate(${(Math.random() * 10 - 5)}deg)` // random rotation -5° to +5°
            }}
          >
            <div className="letter-content">
              <span className="letter-char">{letter}</span>
            </div>
            <div className="letter-glow"></div>
          </div>
        ))}
      </div>
      
      <div className="scramble-decoration">
        <div className="decoration-line"></div>
        <span className="decoration-icon">🔀</span>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
}
