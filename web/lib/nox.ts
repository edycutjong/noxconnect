import { BrowserProvider, type Eip1193Provider } from 'ethers';
import { createEthersHandleClient } from '@iexec-nox/handle';
import { NoxConnectClient, type NoxConnectConfig, type HandleClientLike } from '@noxconnect/core';
import { CONTRACTS, NETWORK } from './contracts';

// Build a NoxConnectClient from a wagmi injected EIP-1193 provider, using the proven ethers path.
export async function makeNoxClient(eip1193: Eip1193Provider): Promise<NoxConnectClient> {
  const provider = new BrowserProvider(eip1193);
  const signer = await provider.getSigner();
  const handle = (await createEthersHandleClient(signer)) as unknown as HandleClientLike;
  const config: NoxConnectConfig = { network: NETWORK, contracts: CONTRACTS };
  return new NoxConnectClient(signer, handle, config);
}
