import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { constants, utils } from "ethers";
import { ethers } from "hardhat";
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
  let addr4: SignerWithAddress;
  // let signer: SignerWithAddress;
  let token0: Token;
  let token1: Token;
  let factory: IUniswapV2Factory;
  let router: IUniswapV2Router02;
  let DailyLottery: any;

  let Frink: any;
  beforeEach(async () => {
    [signer, addr, addr1, addr2, addr3, addr4] = await ethers.getSigners();


    ({ factory, router } = await UniswapV2Deployer.deploy(signer));
    DailyLottery = await ethers.getContractFactory(
      "DailyFrinkLottery",
      signer
    )
    const tokenFactory = (await ethers.getContractFactory(
      "Token",
      signer
    )) as Token__factory;
    Frink = (await ethers.getContractFactory(
      "FrinkToken",
      signer
    ));
    token0 = await tokenFactory.deploy(eth(1_0000000000000));
    Frink = await Frink.deploy(token0.address, router.address);
    token1 = await tokenFactory.deploy(eth(1_0000000000000));
    await token0.deployed();
    await Frink.deployed();
    await token1.deployed();
    DailyLottery = await DailyLottery.deploy(Frink.address, token0.address)
    await DailyLottery.deployed();

  });
  
  // it("works", async () => {
  //   await Frink.transfer(addr.address, eth(100))
  //   await Frink.transfer(addr1.address, eth(100))

  //   await Frink.connect(addr).transfer(addr3.address, eth(100))
  //   await Frink.connect(addr1).transfer(addr4.address, eth(100))

  //   expect((await Frink.balanceOf(addr3.address)).toString()).equal(
  //     "98000000000000000000"
  //   );
  //   expect((await Frink.balanceOf(addr4.address)).toString()).equal(
  //     "98000000000000000000"
  //   );

  //   await Frink.filterDailyList();
  //   await Frink.filterWeeklyList();





  //   // console.log(await Frink.DailyList)
  //   await token0.transfer(DailyLottery.address, eth(100));
  //   // await token1.approve(router.address, eth(100));
  //   await DailyLottery.pickDailyLotteryWinner()

  // });
  it("works", async () => {
    await token0.approve(router.address, eth(1000000000));
    await token1.approve(router.address, eth(1000000000));
    await Frink.approve(router.address, eth(1000000000));
    await Frink.connect(addr).approve(router.address, eth(1000000000));
    await Frink.connect(addr1).approve(router.address, eth(1000000000));
    await Frink.transfer(addr.address, eth(100))
    await Frink.transfer(addr1.address, eth(100))

    await Frink.connect(addr).transfer(addr3.address, eth(100))
    await Frink.connect(addr1).transfer(addr4.address, eth(100))


    // await router.addLiquidityETH(
    //   Frink.address,
    //   eth(10000000),
    //   eth(10000000),
    //   eth(10),
    //   signer.address,
    //   constants.MaxUint256,
    //   { value: eth(10) }
    // );

    // await router.addLiquidityETH(
    //   token0.address,
    //   eth(1000000000),
    //   eth(1000000000),
    //   eth(10),
    //   signer.address,
    //   constants.MaxUint256,
    //   { value: eth(10) }
    // );
    await router.addLiquidity(
        Frink.address,
      token0.address,
      eth(10000000),
      eth(10000000),
      0,
      0,
      signer.address,
      constants.MaxUint256
    );


    // expect((await pair.balanceOf(signer.address)).toString()).equal(
    //   "9999999999999999000"
    // );

    //     await router.swapExactTokensForTokens(
    //       eth(1),
    //       0,
    //       [token0.address, Frink.address],
    //       signer.address,
    //       constants.MaxUint256
    //     );



    // await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    //   eth(100),
    //   0,
    //   [token0.address,
    //   Frink.address],
    //   signer.address,
    //   constants.MaxUint256
    // );
    // await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    //   eth(1000),
    //   0,
    //   [Frink.address, await router.WETH()],
    //   signer.address,
    //   constants.MaxUint256
    // );
    // await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    //   eth(1000),
    //   0,
    //   [Frink.address, token0.address],
    //   signer.address,
    //   constants.MaxUint256
    // );
  

    // await router.connect(addr).swapExactTokensForETHSupportingFeeOnTransferTokens(
    //   eth(10),
    //   0,
    //   [Frink.address ,await router.WETH() ],
    //   signer.address,
    //   constants.MaxUint256
    // );
    // await router.connect(addr1).swapExactTokensForETHSupportingFeeOnTransferTokens(
    //   eth(10),
    //   0,
    //   [Frink.address,await router.WETH() ],
    //   signer.address,
    //   constants.MaxUint256
    // );
    // expect(await (await token0.balanceOf(signer.address)).toString()).to.equal(
    //   "989000000000000000000"
    // );
    // expect(await (await token1.balanceOf(signer.address)).toString()).to.equal(
    //   "990906610893880149131"
    // );
    // await Frink.transfer(Frink.address, eth(1000000));
    // await Frink.transfer(Frink.address, eth(1000000));
    // await Frink.transfer(Frink.address, eth(1000000));
    // await Frink.transfer(Frink.address, eth(10));
    // await Frink.transfer(Frink.address, eth(100));
  });
});
