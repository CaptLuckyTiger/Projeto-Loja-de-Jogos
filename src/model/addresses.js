export function addAddress(addresses, address) {
  return [
    {
      id: `addr-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      ...address,
    },
    ...addresses,
  ];
}

export function removeAddress(addresses, id) {
  return addresses.filter((address) => address.id !== id);
}
