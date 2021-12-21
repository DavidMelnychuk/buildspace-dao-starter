import sdk from './1-initialize-sdk.js';

const DROP_MODULE_ADDRESS = '0x6d900E299dA26d3a9140dBf97Ae97200DE083603';
const bundleDrop = sdk.getBundleDropModule(DROP_MODULE_ADDRESS);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1
    });

    // 0 for passing in tokenID 0, can have multiple membership NFTs that have different IDs
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log('✅ Sucessfully set claim condition!');
  } catch (err) {
    console.error('Failed to set claim condition', err);
  }
})();
