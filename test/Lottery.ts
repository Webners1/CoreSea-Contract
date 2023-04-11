// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import chai from "chai";
// import chaiAsPromised from "chai-as-promised";
// import { constants, utils } from "ethers";
// import { ethers } from "hardhat";
// import {
//   UniswapV2Deployer,
//   IUniswapV2Factory,
//   IUniswapV2Pair__factory,
//   IUniswapV2Router02,
// } from "../src";
// import { FRINKTOKEN } from "../typechain";

// chai.use(chaiAsPromised);
// const { expect } = chai;

// function eth(n: number) {
//   return utils.parseEther(n.toString());
// }

// describe("swap", () => {
//   let signer: SignerWithAddress;
//   let addr: SignerWithAddress;
//   let addr1: SignerWithAddress;
//   let addr2: SignerWithAddress;
//   let addr3: SignerWithAddress;
//   let token0:any;
//   let factory: IUniswapV2Factory;
//   let router: IUniswapV2Router02;
//   let FrinkToken:any;
//   let FrinkDemo:any;
//   let DailyLottery:any;
//   let demo:any;
//   beforeEach(async () => {
//     [signer,addr,addr1,addr2,addr3] = await ethers.getSigners();

//     ({ factory, router } = await UniswapV2Deployer.deploy(signer));

//     const tokenFactory = (await ethers.getContractFactory(
//       "Token",
//       signer
//     ));
    
//  DailyLottery = await ethers.getContractFactory(
//   "DailyFrinkLottery",
//   signer
// )
//  FrinkToken = await ethers.getContractFactory(
//   "FrinDemo",
//   signer
// )



// token0 = await tokenFactory.deploy(eth(1_000_00000));
// await token0.deployed();
// FrinkToken = await FrinkToken.deploy(router.address,token0.address);
// await FrinkToken.deployed();

// // FrinkToken = await FrinkToken.deploy(router.address,token0.address);
// // await FrinkToken.deployed();
// DailyLottery = await DailyLottery.deploy(FrinkToken.address,token0.address)
// // token1 = await tokenFactory.deploy(eth(1_000));

// await DailyLottery.deployed();
//     // await token1.deployed();
//   });

//   it("works", async () => {
//    await FrinkToken.transfer(addr.address,eth(100))
//    await FrinkToken.transfer(addr1.address,eth(100))
//    await FrinkToken.transfer(addr2.address,eth(10))
//    await FrinkToken.transfer(addr3.address,eth(10))
//    await FrinkToken.connect(addr).transfer(addr3.address,eth(100))

  
//    await FrinkToken.filterDailyList();
//    await FrinkToken.filterWeeklyList();
   
//  // expect((await pair1.balanceOf(signer.address)).toString()).equal(
// //   "99999999999999999000"
// // );


// await router.addLiquidityETH(
//   FrinkToken.address,
// eth(100000),
//   eth(1000000),
//   eth(20),
//   signer.address,
//   constants.MaxUint256,
//   { value: eth(20) }
// );

// await router.addLiquidityETH(
//   token0.address,
// eth(100000),
//   eth(1000000),
//   eth(20),
//   signer.address,
//   constants.MaxUint256,
//   { value: eth(20) }
// );


//   // console.log(await FrinkToken.DailyList)
//   await token0.transfer(DailyLottery.address, eth(100));
//   // await token1.approve(router.address, eth(100));
//   await DailyLottery.pickDailyLotteryWinner()
//   // expect(await DailyLottery.winnerDetails((await DailyLottery.winners())[0])).not.equal(
//   // "0")
 
//   await FrinkToken.transfer(FrinkToken.address,eth(10000));
//   await FrinkToken.transfer(FrinkToken.address,eth(10));
//   // expect(await DailyLottery.winnerDetails((await DailyLottery.winners())[0])).equal(
//   //   eth(100))
// });
// it("works", async () => {
//   await token0.approve(router.address, eth(1000000000));
//   await FrinkToken.approve(router.address, eth(1000000000));
//   await FrinkToken.transfer(FrinkToken.address,eth(1));
//   // await FrinkToken.transferFrom(FrinkToken.address, addr1.address,eth(100));


//   await router.addLiquidityETH(
//     FrinkToken.address,
// eth(100000),
//     eth(1000000),
//     eth(20),
//     signer.address,
//     constants.MaxUint256,
//     { value: eth(20) }
//   );

//   await router.addLiquidityETH(
//     token0.address,
// eth(100000),
//     eth(1000000),
//     eth(20),
//     signer.address,
//     constants.MaxUint256,
//     { value: eth(20) }
//   );

//   await router.addLiquidity(
//     token0.address,
//     FrinkToken.address,
//     eth(10000000),
//     eth(10000000),
//     0,
//     0,
//     signer.address,
//     constants.MaxUint256
//   );

//   const pair = IUniswapV2Pair__factory.connect(
//     await factory.getPair(token0.address, FrinkToken.address),
//     signer
//   );

//   // expect((await pair.balanceOf(signer.address)).toString()).equal(
//   //   "9999999999999999000"
//   // );

//   await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//     eth(1),
//     0,
//     [token0.address, FrinkToken.address],
//     signer.address,
//     constants.MaxUint256
//   );
//   await FrinkToken.transfer(FrinkToken.address,eth(100));
//   await FrinkToken.transfer(FrinkToken.address,eth(1));


//   await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
//     eth(100),
//     0,
//     [FrinkToken.address, await router.WETH()],
//     signer.address,
//     constants.MaxUint256
//     );
    


//     await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//       eth(10),
//       0,
//       [token0.address,FrinkToken.address ],
//       signer.address,
//       constants.MaxUint256
//       );
    
  
//   // await FrinkToken.transfer(FrinkToken.address,eth(10000));
//   // await FrinkToken.transfer(FrinkToken.address,eth(10));

 


//   // expect((await (await FrinkToken.balanceOf(signer.address)).toString()).toString()).to.greaterThan(
//   //   eth(90)
//   // );
//   // await FrinkToken.transfer(FrinkToken.address, eth(100));

// });

//   });

