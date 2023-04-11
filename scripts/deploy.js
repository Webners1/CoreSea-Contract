const { upgrades } = require("hardhat")

async function main() {
    let PostUint256 = await ethers.getContractFactory("PostUint256")
    let SitchToken = await ethers.getContractFactory("SitchToken")
    let LendingProtocol = await ethers.getContractFactory("LendingProtocol")
    let Token = await ethers.getContractFactory("Token")
    let TokenVault = await ethers.getContractFactory("TokenVault")
    const BUSD_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"


    PostUint256 = await PostUint256.deploy()
    await PostUint256.deployed()
    Token = await Token.deploy("100000000000000000000000000")
    await Token.deployed()



    SitchToken = await upgrades.deployProxy(SitchToken,
        [PostUint256.address, BUSD_ADDRESS], {
        initializer: 'initialize'
    })
    
    await SitchToken.deployed()
    TokenVault = await TokenVault.deploy()
    await TokenVault.deployed()
    await SitchToken.setVault(TokenVault.address)
    
    
    LendingProtocol = await upgrades.deployProxy(LendingProtocol,
        [   Token.address,
            SitchToken.address,
            PostUint256.address
        ], {
        initializer: 'initialize'
    })
    
    const MyContract = await ethers.getContractFactory("ERC20");
    const BUSD_CONTRACT = await MyContract.attach(
    Token.address// The deployed contract address
);
    await LendingProtocol.deployed()
    await PostUint256.transferOwnership(SitchToken.address)
    await SitchToken.approve(TokenVault.address, "10000000000000000000000000000")
    await BUSD_CONTRACT.approve(TokenVault.address, "10000000000000000000000000000")

    console.log("LendingProtocol:", LendingProtocol.address)
    console.log("TokenVault:", TokenVault.address)
    console.log("PostUint256:", PostUint256.address)
    console.log("SitchToken:", SitchToken.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })