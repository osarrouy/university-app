/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  // runtime: 'nodejs18.x'
	runtime: 'edge'
};

import { ethers } from 'ethers';

const AMOUNT_ETH = '0.01';
 
export const load = async (request, response) => {
	const address = request.url.searchParams.get('address')
	const provider = new ethers.InfuraProvider('sepolia', process.env.PROJECT_ID, process.env.PROJECT_SECRET);
	const wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(provider); // 0x6affb932e75147b64ccf3e0bdc1e5756f4fe968e

	await wallet.sendTransaction({
		to: address,
		value: ethers.parseEther(AMOUNT_ETH)
	});

	console.log(AMOUNT_ETH + ' ETH => ' + address);

	return {
		statusCode: 200,
		body: JSON.stringify({ status: 'OK' }),
		headers: {
			'access-control-allow-origin': '*'
		}
	};
}