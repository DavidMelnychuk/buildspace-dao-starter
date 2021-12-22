import sdk from './1-initialize-sdk.js';

const TOKEN_MODULE_ADDRESS = '0xfB57eB356b9f48743b8F93b0b225080353AC0a4b';
const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    console.log(
      '👀 Roles that exist right now:',
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers our wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      '🎉 Roles after revoking ourselves',
      await tokenModule.getAllRoleMembers()
    );
    console.log(
      '✅ Successfully revoked our superpowers from the ERC-20 contract'
    );
  } catch (err) {
    console.error('Failed to revoke ourselves from the DAO treasury', err);
  }
})();
