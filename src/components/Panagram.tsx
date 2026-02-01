import Input from "./Input.tsx";
import PanagramImage from "./PanagramImage.tsx";
import ConnectWallet from "./ConnectWallet.tsx";
import NFTGalleryContainer from "./NFTGalleryContainer.tsx";
import { useAccount } from "wagmi";
import StarryBackground from "./Starrybackground.tsx";

function Panagram() {
  const { isConnected, address: userAddress } = useAccount();

  return (
    <div className="panagram-container">
      <StarryBackground />
      
      <div className="panagram-content">
        {!isConnected ? (
          // DISCONNECTED STATE - Beautiful Landing Page
          <div className="landing-page">
            <div className="hero-section">
              <div className="hero-badge">
                <span className="badge-icon">🎮</span>
                <span className="badge-text">Web3 Word Game</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-gradient">Panagram</span>
              </h1>
              
              <p className="hero-subtitle">
                A zero-knowledge word game where players prove they know the correct word{" "}
                <span className="highlight-text">without revealing it</span>
              </p>
              
              <div className="hero-description">
                <div className="feature-item">
                  <span className="feature-icon">🧩</span>
                  <span className="feature-text">Unscramble the letters</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔐</span>
                  <span className="feature-text">Generate ZK proof</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎨</span>
                  <span className="feature-text">Mint NFT badges</span>
                </div>
              </div>
              
              <div className="cta-section">
                <ConnectWallet />
                <p className="cta-hint">Connect your wallet to start playing</p>
              </div>
              
              <div className="tech-stack">
                <span className="tech-label">Built with</span>
                <div className="tech-badges">
                  <span className="tech-badge">Noir</span>
                  <span className="tech-badge">UltraHonk</span>
                  <span className="tech-badge">ERC-1155</span>
                  <span className="tech-badge">Ethereum</span>
                </div>
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="preview-section">
              <div className="preview-card">
                <h3 className="preview-title">How It Works</h3>
                <div className="preview-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Unscramble</h4>
                      <p>Figure out the hidden word from scrambled letters</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Prove</h4>
                      <p>Generate a zero-knowledge proof without revealing your answer</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Earn</h4>
                      <p>Collect NFT badges for correct answers and victories</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="preview-nft-showcase">
                <h3 className="preview-title">Collect NFT Badges</h3>
                <div className="nft-preview-grid">
                  <div className="nft-preview-item winner">
                    <div className="nft-preview-icon">🏆</div>
                    <div className="nft-preview-label">Winner Badge</div>
                  </div>
                  <div className="nft-preview-item achievement">
                    <div className="nft-preview-icon">⭐</div>
                    <div className="nft-preview-label">Achievement Badge</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // CONNECTED STATE - Game Interface
          <div className="panagram-card">
            <div className="game-header">
              <h1 className="game-title">
                <span className="title-gradient">Panagram</span>
              </h1>
              
              <div className="game-status-bar">
                <div className="status-item">
                  <span className="status-icon">🎮</span>
                  <span className="status-text">Playing</span>
                </div>
                <div className="wallet-display">
                  <ConnectWallet />
                </div>
              </div>
            </div>

            {/* Side by Side Layout */}
            <div className="side-by-side-layout">
              {/* LEFT SIDE - Panagram Game */}
              <div className="game-side">
                <div className="game-panel-card">
                  <div className="panel-header">
                    <h2 className="panel-title">
                      <span className="panel-icon">🧩</span>
                      Solve the Puzzle
                    </h2>
                  </div>
                  <PanagramImage />
                  <Input />
                </div>
              </div>

              {/* RIGHT SIDE - NFT Gallery */}
              <div className="gallery-side">
                <div className="gallery-panel-card">
                  {userAddress ? (
                    <NFTGalleryContainer userAddress={userAddress} />
                  ) : (
                    <div className="no-address-card">
                      <p>🔌 No address available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panagram;