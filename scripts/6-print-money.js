import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';
const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    const amount = 1_000_000;
    // 18 decimals is standard for ERC20 tokens
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(
      '✅ There now is',
      ethers.utils.formatUnits(totalSupply, 18),
      '$YE in circulation'
    );
  } catch (err) {
    console.error('Failed to print money', error);
  }
})();
