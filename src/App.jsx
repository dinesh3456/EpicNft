import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import EpicNFT from './utils/EpicNFT.json';
import { ethers } from "ethers";

const TWITTER_HANDLE = 'Dinesh Ravishankar';
const TWITTER_LINK = `https://twitter.com/DineshRavishan4`;
const OPENSEA_LINK = 'https://rainbow.me/0xe50fc795e586B9Cd2f888142EBE5Fb9e59a26812?family=mintkudos';
const TOTAL_MINT_COUNT = 50;

const CONTRACT_ADDRESS = "0x48d0ef16f197Fac15113Af28Eff62B5ad4b69274";
//let originalCount =0;

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [nftCount, setNftCount] = useState(0);
   
    //const [isLoading, setIsLoading] = useState(true);

   

  const checkIfWalletIsConnected= async() =>{
    const {ethereum} = window
    const goerliChainId = "0x5";
    let chainId = await ethereum.request({method: 'eth_chainId'});
    console.log("connected to chain"+chainId);
    if(!ethereum){
      console.log("You don't have metemask");
      return;
    }
    else if(chainId !== goerliChainId){
      alert("You are not connected to the goerli test network");
    }
    else{
      console.log("we have an ethereum object",ethereum);
    } 

  const accounts = await ethereum.request({method:'eth_accounts'});

  if(accounts.length !==0){
    const account = accounts[0];
    console.log("Found an authorised account: ",account);
    setCurrentAccount(account);
    setUpEventListener()
  }
  else{
    console.log("No authorised account found");
  }
  }

  const connectWallet = async() => {
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert("get metamask");
      }
      const accounts = await ethereum.request({method:"eth_requestAccounts"});
      console.log("Connected",accounts[0]);
      setUpEventListener()
      
    }catch(error){
        console.log(error);
      }
    
  }
  
  const setUpEventListener = async() =>{
    try{
      const {ethereum} = window
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS,EpicNFT.ABI,signer);

        connectedContract.on("EpicNFTIndex",(from, tokenId) => {
          console.log(from,tokenId.toNumber())
          alert(`Hey there! we've minted your Epic NFT and sent it to your wallet. Right now it may be blank.It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        })
        console.log("Setup event listner");
      }
      else{
        console.log("Ethereum object not found");
      }
    }catch(error){
      console.log(error);
    }
  }

 

 
  

  const askContractToMintNft = async() =>{
    try{
      const{ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EpicNFT.abi,signer);
      
        console.log("Going to pop wallet now to pay gas..");
        let nfttxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining.. please wait");
        await nfttxn.wait();
       
      getNftCount();
        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nfttxn.hash}`);
        //return true;
      }else{
        console.log("Ethereum object doesn't exitst");
      }
      }catch(error){
      console.log(error);
      }
    }
   
  
 

// function to get the number of NFTs mined
const getNftCount = async () => {
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EpicNFT.abi, signer);

    let count = await connectedContract.getTotalNFTMinted();
   
  
    setNftCount(count);
    setUpEventListener1();
    
    console.log("You have mined %s nfts out of 50",count);
  } catch (error) {
    console.log(error);
  }
}

  const setUpEventListener1 = async() =>{
    try{
      const {ethereum} = window
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS,EpicNFT.ABI,signer);
        connectedContract.on("EpicNFTCount",(MintedNFT) => {
          console.log(MintedNFT);
          alert("you have mined {MintedNFT} NFTs out of 50");
         
        })
        console.log("Setup event listner");
      }
      else{
        console.log("Ethereum object not found");
      }
    }catch(error){
      console.log(error);
    }
  }

  
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() =>{
    checkIfWalletIsConnected();
  },[])

  useEffect(() => {

   getNftCount();

  }, []);
  


  

  return (
    
    <div className="App">
      <div className="container">
        <div className="header-container">
          
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Each one. Each different.
            Discover your NFT today.
          </p>                 
        
          {currentAccount === "" ?(renderNotConnectedContainer()):(
      <button onClick = {askContractToMintNft} classname="cta-button connect-wallet-button">Mint Your Epic NFT</button>   
          )}   
     

  </div>

      

        
        <div className="footer-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
    <p style={{ margin: "0", textAlign: "center" }}>
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`built on @${TWITTER_HANDLE}`}</a>
    </p>
  </div>
  <p style={{ margin: "0", textAlign: "center" }}>
    <a
      className="footer-text"
      href={OPENSEA_LINK}
      target="_blank"
      rel="noreferrer"
    >{`See my NFT collections @${OPENSEA_LINK}`}</a>
  </p>
</div>
</div>
     
    </div>
  );
};



export default App;