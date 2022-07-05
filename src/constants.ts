export const paths = {
    Home: '/',
    Login: '/login',
};

export const METAMASK_EXTENSION_LINK =
    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

export const marketplaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
export const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;

export const marketplaceAbi = require('./abi/marketplace.json');
export const tokenAbi = require('./abi/pausToken.json');

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const LOCAL_IPFS_NODE_URL = process.env.REACT_APP_IPFS_URL;
