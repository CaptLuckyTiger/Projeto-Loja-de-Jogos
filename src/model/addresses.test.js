import { describe, expect, it } from 'vitest';
import { addAddress, removeAddress } from './addresses';

describe('addresses', () => {
  it('adds address with id', () => {
    const result = addAddress([], { street: 'Rua A', number: '123', city: 'Curitiba', state: 'PR', zip: '80000-000' });
    expect(result[0].id).toBeTruthy();
    expect(result[0].street).toBe('Rua A');
  });

  it('removes address by id', () => {
    const initial = [
      { id: '1', street: 'A' },
      { id: '2', street: 'B' },
    ];
    expect(removeAddress(initial, '1')).toEqual([{ id: '2', street: 'B' }]);
    expect(initial).toEqual(initial); // no mutation
  });
});
