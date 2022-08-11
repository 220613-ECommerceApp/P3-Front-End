import { Cartitem } from './cartitem';
import { Product } from './product';
import { User } from './user';

describe('Cartitem', () => {
  it('should create an instance', () => {
    expect(
      new Cartitem(
        1,
        12,
        new Product(1, 'hat', 12, 'bryans hat', 99.99, 'hat url'),
        new User(1, 'Bob', 'Who', 'testUser', '123456', 'testemail@gmail.com')
      )
    ).toBeTruthy();
  });
});
