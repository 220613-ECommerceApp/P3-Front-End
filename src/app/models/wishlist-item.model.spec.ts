import { Product } from './product';
import { WishlistItem } from './wishlist-item';

describe('WishlistItem', () => {
  it('should create an instance', () => {
    expect(
      new WishlistItem(
        1,
        new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url')
      )
    ).toBeTruthy();
  });
});
