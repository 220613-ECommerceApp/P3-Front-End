import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(
      new User(1, 'Bob', 'Who', 'testUser', '123456', 'testemail@gmail.com')
    ).toBeTruthy();
  });
});
