import { Signer, Contract, ContractFactory, constants } from "ethers";
import { IUniswapV2Factory, IUniswapV2Router02 } from "../types";
import WETH9 from "../util/WETH9.json";

type ContractJson = { abi: any; bytecode: string };
const artifacts: { [name: string]: ContractJson } = {
  UniswapV2Factory: require("@uniswap/v2-core/build/UniswapV2Factory.json"),
  UniswapV2Pair: require("@uniswap/v2-core/build/UniswapV2Pair.json"),
  UniswapV2ERC20: require("@uniswap/v2-core/build/UniswapV2ERC20.json"),
  UniswapV2Router02: require("@uniswap/v2-periphery/build/UniswapV2Router02.json"),
  WETH9,
};

export class UniswapV2Deployer {
  static async deploy(
    actor: Signer
  ): Promise<{
    router: IUniswapV2Router02;
    factory: IUniswapV2Factory;
    weth9: Contract;
  }> {
    const deployer = new UniswapV2Deployer(actor);

    const weth9 = await deployer.deployWETH9();
    const factory = await deployer.deployFactory();
    const router = await deployer.deployRouter(factory.address, weth9.address);

    return {
      weth9,
      factory,
      router,
    };
  }

  deployer: Signer;

  constructor(deployer: Signer) {
    this.deployer = deployer;
  }

  async deployFactory() {
    return (await this.deployContract<IUniswapV2Factory>(
      artifacts.UniswapV2Factory.abi,
      artifacts.UniswapV2Factory.bytecode,
      [constants.AddressZero],
      this.deployer
    )) as IUniswapV2Factory;
  }

  async deployWETH9() {
    return await this.deployContract<Contract>(
      artifacts.WETH9.abi,
      artifacts.WETH9.bytecode,
      [],
      this.deployer
    );
  }

  async deployRouter(factoryAddress: string, weth9Address: string) {
    return (await this.deployContract<IUniswapV2Router02>(
      artifacts.UniswapV2Router02.abi,
      artifacts.UniswapV2Router02.bytecode,
      [factoryAddress, weth9Address],
      this.deployer
    )) as IUniswapV2Router02;
  }

  private async deployContract<T>(
    abi: any,
    bytecode: string,
    deployParams: Array<any>,
    actor: Signer
  ) {
    const factory = new ContractFactory(abi, bytecode, actor);
    return await factory.deploy(...deployParams);
  }
}
