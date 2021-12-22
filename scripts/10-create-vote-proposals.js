import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

const VOTING_MODULE_ADDRESS = '0x395562E186E3D3c34e7304DB392C0d7ebFE45044';
const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';

const voteModule = sdk.getVoteModule(VOTING_MODULE_ADDRESS);
const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    const amount = 420_000;

    await voteModule.propose(
      'Should the DAO mint an additional ' +
        amount +
        ' tokens into the treasury?',
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            'mint',
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address
        }
      ]
    );
    console.log('✅ Successfully created proposal to mint tokens');
  } catch (err) {
    console.error('failed to create first proposal', error);
    process.exit(1);
  }

  try {
    const amount = 6_900;

    await voteModule.propose(
      'Should the DAO transfer ' +
        amount +
        ' tokens from the treasury to ' +
        process.env.WALLET_ADDRESS +
        ' for being awesome?',
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            'transfer',
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18)
            ]
          ),
          toAddress: tokenModule.address
        }
      ]
    );
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error('failed to create second proposal', error);
  }
})();
