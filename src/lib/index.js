const shorten = (address) => {
  const first = address.substr(0, 4);
  const last = address.substr(address.length - 4);
  return first + '...' + last;
}

export { shorten };