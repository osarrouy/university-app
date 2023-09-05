/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'nodejs18.x'
};

import { ethers } from 'ethers';

const AMOUNT_ETH = '0.01';
 
export const load = (request, response) => {
	const address = request.url.searchParams.get('address')
	const provider = new ethers.InfuraProvider('goerli', process.env.PROJECT_ID, process.env.PROJECT_SECRET);
	const wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC).connect(provider); // 0x6affb932e75147b64ccf3e0bdc1e5756f4fe968e

	wallet.sendTransaction({
		to: address,
		value: ethers.parseEther(AMOUNT_ETH)
	});

	console.log(AMOUNT_ETH + ' ETH => ' + address);

	 response.status(200).json({
    body: JSON.stringify({ status: 'OK' }),
		headers: {
			'access-control-allow-origin': '*'
		}
  });

 
}