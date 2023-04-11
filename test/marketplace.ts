import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { constants, utils } from "ethers";
import { ethers,upgrades} from "hardhat";
require('@openzeppelin/hardhat-upgrades');
import {
  UniswapV2Deployer,
  IUniswapV2Factory,
  IUniswapV2Pair__factory,
  IUniswapV2Router02,
} from "../src";
import { Token, Token__factory } from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

function eth(n: number) {
  return utils.parseEther(n.toString());
}

describe("swap", () => {
    let signer: SignerWithAddress;
  let addr: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  // let signer: SignerWithAddress;
  let token0: Token;
  let token1: Token;
  let nft: any;
  let factory: IUniswapV2Factory;
  let router: IUniswapV2Router02;
  let AstroBirdMarketplace:any;

let Frink:any;
  beforeEach(async () => {
      [signer,addr,addr1,addr2,addr3] = await ethers.getSigners();


    ({ factory, router } = await UniswapV2Deployer.deploy(signer));
    AstroBirdMarketplace = await ethers.getContractFactory(
  "AstroBirdMarketplace"
)
nft = await ethers.getContractFactory(
    "nft",
    signer
  )
    const tokenFactory = (await ethers.getContractFactory(
      "Token",
      signer
    )) as Token__factory;

     Frink = (await ethers.getContractFactory(
        "Demo",
        signer
      ));
    token0 = await tokenFactory.deploy(eth(1_0000000000000));
    nft = await nft.deploy();
   await nft.deployed()
    Frink = await Frink.deploy(token0.address,router.address);
    token1 = await tokenFactory.deploy(eth(1_0000000000000));
    await token0.deployed();
    AstroBirdMarketplace =await upgrades.deployProxy(AstroBirdMarketplace,[token0.address], { initializer: 'initialize'})
    AstroBirdMarketplace = await AstroBirdMarketplace.deployed();

  });   
  it("works", async () => {
     expect((await token0.balanceOf(signer.address)).toString()).equal(
   eth(1_0000000000000)
 );
 
  await  nft.safeMint(signer.address);
  await  nft.safeMint(signer.address);
  await  nft.safeMint(signer.address);
  await token0.transfer(addr.address,eth(100000))
  await nft.setApprovalForAll(AstroBirdMarketplace.address, true)
  await AstroBirdMarketplace.createMarketItemWithERC20(nft.address,1,eth(10));
  await AstroBirdMarketplace.createMarketItemWithERC20(nft.address,2,eth(10));
await token0.connect(addr).approve(AstroBirdMarketplace.address,eth(1000))
  await AstroBirdMarketplace.connect(addr).createMarketSaleWithERC20(nft.address,1);
  await AstroBirdMarketplace.connect(addr).createMarketSaleWithERC20(nft.address,2);



 

   // expect(await DailyLottery.winnerDetails((await DailyLottery.winners())[0])).not.equal(
   // "0")
  
   // expect(await DailyLottery.winnerDetails((await DailyLottery.winners())[0])).equal(
   //   eth(100))
 });
});
