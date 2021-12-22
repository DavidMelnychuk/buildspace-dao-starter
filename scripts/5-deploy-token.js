import sdk from './1-initialize-sdk.js';

const APP_ADDRESS = '0x4aad2e29ec88928D85F696AD4e19E63d99b282C8';
const app = sdk.getAppModule(APP_ADDRESS);

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: 'KanyeDAO Governance Token',
      symbol: 'YE'
    });
    console.log(
      '✅ Successfully deployed token module, address:',
      tokenModule.address
    );
  } catch (err) {
    console.error('failed to deploy token module', err);
  }
})();
