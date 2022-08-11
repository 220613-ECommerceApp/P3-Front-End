import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(
      new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')
    ).toBeTruthy();
  });
});
