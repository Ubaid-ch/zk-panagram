import NFTGallery from "./NFTGallery";

export default function NFTGalleryContainer({
  userAddress,
}: {
  userAddress: string;
}) {
  return (
    <div className="nft-gallery-container">
      <div className="galaxy-header">
        <h2 className="collection-title">Your NFT Collection</h2>
        <p className="collection-subtitle">Celestial achievements await</p>
      </div>
      
      <div className="nft-grid">
        <div className="nft-card-wrapper">
          <NFTGallery owner={userAddress} token_id={0} />
        </div>

        <div className="nft-card-wrapper">
          <NFTGallery owner={userAddress} token_id={1} />
        </div>
      </div>
    </div>
  );
}