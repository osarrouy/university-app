/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'nodejs18.x'
};

import { ethers } from 'ethers';
 
export const load = async (request, response) => {
	console.log(process.env.PROJECT_ID)
	console.log(process.env.PROJECT_SECRET)

	const address = request.url.searchParams.get('address')
	const amountInEther = '0.01';

	let wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC); // 0x6affb932e75147b64ccf3e0bdc1e5756f4fe968e
	
	const provider = new ethers.InfuraProvider('goerli', process.env.PROJECT_ID, process.env.PROJECT_SECRET);
	console.log(provider.projectId)
	console.log(provider.projectSecret)


	const tx = {
		to: address,
		value: ethers.parseEther(amountInEther)
	};
	wallet = wallet.connect(provider);
	const receipt = await wallet.sendTransaction(tx);

	console.log(receipt.hash + ' => ' + address);
	console.log('Balance : ' + (await wallet.getBalance()).toString());

	 response.status(200).json({
    body: JSON.stringify({ status: 'OK' }),
		headers: {
			'access-control-allow-origin': '*'
		}
  });

 
}