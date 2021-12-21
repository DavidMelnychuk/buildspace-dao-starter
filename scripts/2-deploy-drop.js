import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const APP_ADDRESS = '0x4aad2e29ec88928D85F696AD4e19E63d99b282C8';
const app = sdk.getAppModule(APP_ADDRESS);

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: 'KanyeDAO Membership',
      description: 'A DAO for those that love Kanye like Kanye loves Kanye',
      image: readFileSync('scripts/assets/kanye.jpeg'),
      primarySaleRecipientAddress: ethers.constants.AddressZero
    });

    console.log(
      '✅ Successfully deployed bundleDrop module, address:',
      bundleDropModule.address
    );
    console.log(
      '✅ bundleDrop metadata:',
      await bundleDropModule.getMetadata()
    );
  } catch (err) {
    console.log('failed to deploy bundleDrop module', err);
  }
})();
