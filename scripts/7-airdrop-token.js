import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

const DROP_MODULE_ADDRESS = '0x6d900E299dA26d3a9140dBf97Ae97200DE083603';
const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';

const bundleDropModule = sdk.getBundleDropModule(DROP_MODULE_ADDRESS);

const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, which has
    // a tokenId of 0
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses('0');

    if (walletAddresses.length === 0) {
      console.log(
        'No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!'
      );
      process.exit(0);
    }

    const airDropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log('✅ Going to airdrop', randomAmount, 'tokens to', address);

      const airDropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18)
      };

      return airDropTarget;
    });

    console.log('🌈 Starting airdrop...');
    await tokenModule.transferBatch(airDropTargets);
    console.log(
      '✅ Successfully airdropped tokens to all the holders of the NFT!'
    );
  } catch (err) {
    console.error('Failed to airdrop tokens', err);
  }
})();
