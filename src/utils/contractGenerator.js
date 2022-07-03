const ethers = require("ethers");

export const contractGenerator = (address, abi, network) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};
