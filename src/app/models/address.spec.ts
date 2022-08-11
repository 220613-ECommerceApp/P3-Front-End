import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(
      new Address(
        'firstName',
        'lastName',
        'address1',
        'address2',
        'city',
        'state',
        'zip',
        'country'
      )
    ).toBeTruthy();
  });
});
