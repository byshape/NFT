import { ethers } from "hardhat";

async function getInterface(abi: Array<string>, functions: Array<string>): Promise<string> {
    let interfaceInstance = new ethers.utils.Interface(abi)
    let interfaceId = ethers.BigNumber.from(0);
    for (let i=0; i < functions.length; i++) {
        interfaceId = interfaceId.xor(ethers.BigNumber.from(interfaceInstance.getSighash(functions[i])));
    }
    return interfaceId.toHexString();
  }

export { getInterface };