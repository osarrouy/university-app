const shorten = (address) => {
  const first = address.substr(0, 4);
  const last = address.substr(address.length - 4);
  return first + '...' + last;
}

const PUBLIC_WALLETCONNECT_ID = '1286a6606e040f0620d01ee2465cb56a';

export { shorten, PUBLIC_WALLETCONNECT_ID };