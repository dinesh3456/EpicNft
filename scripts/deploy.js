const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to: ", nftContract.address);

  let txn = await nftContract.makeAnEpicNFT();
  await txn.wait();
  let NFTcount = await nftContract.getTotalNFTMinted();
  console.log("Minted an NFT ");
  console.log("---------------------------------------");
  txn = await nftContract.makeAnEpicNFT();
  await txn.wait();
  NFTcount = await nftContract.getTotalNFTMinted();
  console.log("Minted an NFT ");
  console.log("---------------------------------------");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
runMain();
