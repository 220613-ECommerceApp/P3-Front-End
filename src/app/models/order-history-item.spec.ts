import { OrderHistoryItem } from './order-history-item';
import { Product } from './product';

describe('OrderHistoryItem', () => {
  it('should create an instance', () => {
    expect(
      new OrderHistoryItem(
        1,
        new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url'),
        100,
        'time'
      )
    ).toBeTruthy();
  });
});
