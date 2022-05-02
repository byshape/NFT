import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const getContract = async (contract: string, hre:HardhatRuntimeEnvironment) => {
    const erc721Factory = await hre.ethers.getContractFactory("Token721");
    return erc721Factory.attach(contract);
}

task("balance721", "Prints the account balance")
.addParam("contract", "ERC721 address", undefined, types.string)
.addParam("owner", "Owner address", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc721 = await getContract(taskArgs.contract, hre);
    let balance = await erc721.balanceOf(taskArgs.owner);
     console.log(taskArgs.owner, "has balance", balance.toString());
});

task("mint721", "Mints token to address")
.addParam("contract", "ERC721 address", undefined, types.string)
.addParam("to", "Recipient address", undefined, types.string)
.addParam("value", "Amount to mint", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc721 = await getContract(taskArgs.contract, hre);
    await erc721.mint(taskArgs.to, taskArgs.value);
    console.log(`Tokens were minted`);
});

task("tokenURI721", "Gets token's URI")
.addParam("contract", "ERC721 address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc721 = await getContract(taskArgs.contract, hre);
    let uri = await erc721.tokenURI(taskArgs.id);
    console.log(`NFT with ID ${taskArgs.id} has URI: ${uri}`);
});

task("setTokenURI721", "Sets token's URI")
.addParam("contract", "ERC721 address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.addParam("uri", "URI address to set", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc721 = await getContract(taskArgs.contract, hre);
    await erc721.setTokenURI(taskArgs.id, taskArgs.uri);
    console.log(`URI was set`);
});