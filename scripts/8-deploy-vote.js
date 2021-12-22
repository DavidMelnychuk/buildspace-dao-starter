import sdk from './1-initialize-sdk.js';

const APP_ADDRESS = '0x4aad2e29ec88928D85F696AD4e19E63d99b282C8';
const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';

const appModule = sdk.getAppModule(APP_ADDRESS);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "KanyeDAO's Proposals",
      votingTokenAddress: TOKEN_MODULE_ADDRESS,
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: '0'
    });
    console.log(
      '✅ Successfully deployed vote module, address:',
      voteModule.address
    );
  } catch (err) {
    console.error('Failed to deploy vote module', err);
  }
})();
