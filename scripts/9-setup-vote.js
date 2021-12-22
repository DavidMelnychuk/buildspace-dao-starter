import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

const VOTING_MODULE_ADDRESS = '0x395562E186E3D3c34e7304DB392C0d7ebFE45044';
const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';

const voteModule = sdk.getVoteModule(VOTING_MODULE_ADDRESS);
const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    // Grant minting permission to the treasury
    await tokenModule.grantRole('minter', voteModule.address);
    console.log(
      'Successfully gave vote module permissions to act on token module'
    );
  } catch (err) {
    console.error(
      'Failed to grant vote module permissions on token modules',
      err
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balance(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract
    await tokenModule.transfer(voteModule.address, percent90);
    console.log('✅ Successfully transferred tokens to vote module');
  } catch (err) {
    console.error('Failed to transfer tokens to vote module', err);
  }
})();
