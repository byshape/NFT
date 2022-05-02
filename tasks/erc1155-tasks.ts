import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const getContract = async (contract: string, hre:HardhatRuntimeEnvironment) => {
    const erc721Factory = await hre.ethers.getContractFactory("Token1155");
    return erc721Factory.attach(contract);
}

task("balance1155", "Prints the account balance")
.addParam("contract", "ERC1155 address", undefined, types.string)
.addParam("owner", "Owner address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc1155 = await getContract(taskArgs.contract, hre);
    let balance = await erc1155.balanceOf(taskArgs.owner, taskArgs.id);
     console.log(taskArgs.owner, "has balance", balance.toString(), "of tokens", taskArgs.id);
});

task("mint1155", "Mints tokens to address")
.addParam("contract", "ERC1155 address", undefined, types.string)
.addParam("to", "Recipient address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.addParam("value", "Amount to mint", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc1155 = await getContract(taskArgs.contract, hre);
    await erc1155.mint(taskArgs.to, taskArgs.id, taskArgs.value);
    console.log(`Tokens were minted`);
});

task("burn1155", "Burns tokens")
.addParam("contract", "ERC1155 address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.addParam("value", "Amount to burn", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc1155 = await getContract(taskArgs.contract, hre);
    await erc1155.burn(taskArgs.id, taskArgs.value);
    console.log(`Tokens were burned`);
});

task("uri1155", "Gets tokens URI")
.addParam("contract", "ERC1155 address", undefined, types.string)
.addParam("id", "Token ID", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc1155 = await getContract(taskArgs.contract, hre);
    let uri = await erc1155.uri(taskArgs.id);
    console.log(`NFT with ID ${taskArgs.id} has URI: ${uri}`);
});

task("setURI1155", "Sets tokens URI")
.addParam("contract", "ERC1155 address", undefined, types.string)
.addParam("uri", "URI address to set", undefined, types.string)
.setAction(async (taskArgs, hre) => {
    let erc1155 = await getContract(taskArgs.contract, hre);
    await erc1155.setURI(taskArgs.uri);
    console.log(`URI was set`);
});