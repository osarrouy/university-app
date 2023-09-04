/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'nodejs18.x'
};

import { ethers } from 'ethers';
 
export const load = async (request, response) => {

	// console.log(event.queryStringParameters);
	// console.log(event.body);
	// console.log(event.path);

  console.log(request.query);

	// let amountInEther = '0.01';
	// let wallet = ethers.Wallet.fromMnemonic('radio shy wolf unlock peanut shock olive entry cry honey page visa'); // 0x8cC0743af4C72866501F591D892e34c4167C8d19
	// const provider = new ethers.providers.InfuraProvider('goerli', {
	// 	projectId: 'd1becb18a48a47ee8f94f0e8491ec7dc',
	// 	projectSecret: '931010e1a5b241b5be44d637245cc80c'
	// });
	// wallet = wallet.connect(provider);

	// const tx = {
	// 	to: event.queryStringParameters.address,
	// 	value: ethers.utils.parseEther(amountInEther)
	// };
	// const receipt = await wallet.sendTransaction(tx);
	// console.log(receipt.hash + ' => ' + event.queryStringParameters.address);
	// console.log('Balance : ' + (await wallet.getBalance()).toString());
	return {
		statusCode: 200,
		body: JSON.stringify({ status: 'OK' }),
		headers: {
			'access-control-allow-origin': '*'
		}
	};


  // response.status(200).json({
  //   body: request.body,
  //   query: request.query,
  //   cookies: request.cookies,
  // });
}