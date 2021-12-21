import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const DROP_MODULE_ADDRESS = '0x6d900E299dA26d3a9140dBf97Ae97200DE083603';
const bundleDrop = sdk.getBundleDropModule(DROP_MODULE_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Yeezy Boost 350 V2',
        description: 'These Yeezys will give you access to KanyeDAO!',
        image: readFileSync('scripts/assets/yeezy.jpeg')
      }
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (err) {
    console.error('failed to create the new NFT', err);
  }
})();
