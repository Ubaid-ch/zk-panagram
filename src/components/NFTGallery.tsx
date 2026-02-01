import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi } from "../abi/abi1155";
import { PANAGRAM_CONTRACT_ADDRESS } from "../constant";

const GATEWAY = "https://silver-wrong-parrotfish-42.mypinata.cloud/ipfs/";

const convertToReliableGateway = (url: string) => {
  if (url.startsWith("https://ipfs.io/ipfs/")) {
    return `${GATEWAY}${url.split("https://ipfs.io/ipfs/")[1]}`;
  }
  return url.startsWith("ipfs://") ? url.replace("ipfs://", GATEWAY) : url;
};

const fetchMetadata = async (uri: string, token_id: number) => {
  const resolvedURI = uri.replace(/{id}/g, token_id.toString());
  const reliableUrl = convertToReliableGateway(resolvedURI);

  try {
    const response = await fetch(reliableUrl, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const metadata = await response.json();
    return {
      metadata,
      imageUrl: metadata.image
        ? convertToReliableGateway(metadata.image)
        : null,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { metadata: null, imageUrl: null };
  }
};
// ... (keep your imports and helper functions the same)

export default function NFTGallery({
  owner,
  token_id,
}: {
  owner: string;
  token_id: number;
}) {
  const isVictoryBadge = token_id === 0;

  const [nftData, setNftData] = useState<{
    metadata: any;
    imageUrl: string | null;
  }>({
    metadata: null,
    imageUrl: null,
  });

  const balanceResult = useReadContract({
    address: PANAGRAM_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "balanceOf",
    args: [owner as `0x${string}`, BigInt(token_id)],
  });

  const uriResult = useReadContract({
    address: PANAGRAM_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "uri",
    args: [BigInt(token_id)],
  });

  useEffect(() => {
    if (!uriResult.data) return;
    fetchMetadata(uriResult.data as string, token_id).then(setNftData);
  }, [uriResult.data, token_id]);

  // ── Debug helper (remove in production or make optional) ──
  useEffect(() => {
    console.log(`[NFTGallery] token_id=${token_id} | owner=${owner.slice(0,6)}...`);
    if (balanceResult.data !== undefined) {
      console.log(`  → balance = ${balanceResult.data.toString()}`);
    }
    if (uriResult.data) {
      console.log(`  → uri = ${uriResult.data}`);
    }
  }, [token_id, owner, balanceResult.data, uriResult.data]);

  if (balanceResult.isLoading || uriResult.isLoading) {
    return <div className="nft-loading-container">Loading badge...</div>;
  }

  if (balanceResult.isError || uriResult.isError) {
    return <div className="nft-error-card">Error loading badge data</div>;
  }

  const balance = balanceResult.data ? Number(balanceResult.data) : 0;

  return (
    <div className="nft-gallery-section">
      <div className="nft-section-header">
        <h3 className="nft-section-title">
          {isVictoryBadge ? "🏆 Victory Badges" : "✨ Achievement Badges"}
        </h3>
        <p className="nft-section-subtitle">
          {isVictoryBadge ? "Times Won (Champion)" : "Times Correct"}
        </p>
      </div>

      {balance > 0 ? (
        <NFTCard
          tokenId={token_id}
          balance={balance}
          imageUrl={nftData.imageUrl}
          isVictory={isVictoryBadge}
        />
      ) : (
        <div className="no-tokens-card">
          <div className="empty-badge-icon">
            {isVictoryBadge ? "🏆" : "⭐"}
          </div>
          <p className="empty-text">No badges earned yet</p>
          <p className="empty-subtext">
            {isVictoryBadge
              ? "Be the first to solve the panagram this round to earn the champion badge!"
              : "Solve correctly (even if not first) to earn an achievement badge!"}
          </p>
        </div>
      )}
    </div>
  );
}

function NFTCard({
  tokenId,
  balance,
  imageUrl,
  isVictory,
}: {
  tokenId: number;
  balance: number;
  imageUrl: string | null;
  isVictory: boolean;
}) {
  return (
    <div className={`nft-card-modern ${isVictory ? 'victory-glow' : ''}`}>
      <div className="nft-card-glow-effect"></div>

      <div className="badge-count-display">
        <span className="badge-count-number">{balance}</span>
        <span className="badge-count-label">owned</span>
      </div>

      <div className="nft-card-body">
        {imageUrl ? (
          <div className="nft-image-wrapper">
            <img
              src={imageUrl}
              alt={`Badge ${tokenId}`}
              className="nft-image-display"
              onError={(e) => {
                e.currentTarget.src = isVictory ? "/fallback-champion.png" : "/fallback-star.png"; // optional fallbacks
              }}
            />
            <div className="image-overlay"></div>
          </div>
        ) : (
          <div className="nft-image-placeholder-modern">
            <span className="placeholder-icon">
              {isVictory ? "🏆" : "⭐"}
            </span>
            <p className="placeholder-text">Image loading...</p>
          </div>
        )}

        <div className="nft-info-section">
          <div className="token-id-badge">
            <span className="token-label">Token</span>
            <span className="token-number">#{tokenId}</span>
          </div>
          {isVictory && (
            <div className="champion-label">CHAMPION</div>
          )}
        </div>
      </div>
    </div>
  );
}