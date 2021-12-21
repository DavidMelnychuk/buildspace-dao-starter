import { useEffect, useMemo, useState } from 'react';

import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';

const sdk = new ThirdwebSDK('rinkeby');

// Grab a refrence to our ERC-1155 contract
const DROP_MODULE_ADDRESS = '0x6d900E299dA26d3a9140dBf97Ae97200DE083603';
const bundleDropModule = sdk.getBundleDropModule(DROP_MODULE_ADDRESS);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log('👋 Address:', address);

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    // Exit if they don't have a connected wallet.
    if (!address) {
      return;
    }
    return bundleDropModule
      .balanceOf(address, '0')
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log('🌟 this user has a membership NFT!');
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error('Failed to get nft balance', error);
      });
  }, [address]);

  if (!address) {
    return (
      <div>
        <h1>Welcome to KanyeDAO</h1>
        <button onClick={() => connectWallet('injected')} className="btn-hero">
          Connect your Wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>👟 Kanye DAO Membership Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  }

  const mintNft = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim('0', 1)
      .catch((error) => {
        console.error('Failed to claim', error);
        setIsClaiming(false);
      })
      .finally(() => {
        setIsClaiming(false);
        setHasClaimedNFT(true);
        console.log(
          `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      });
  };

  return (
    <div className="mint-nft">
      <h1>Mint your free 👟 Kanye DAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNft()}>
        {isClaiming ? 'Minting...' : 'Mint your NFT (FREE)'}
      </button>
    </div>
  );
};

export default App;
