import {searchObjects, keyMatcher} from '../utils'


const currencies = [
    {currency: 'EUR'},
    {currency: 'USD'},
    {currency: 'JPY'},
]

describe('SearchObjects', () => {
    it('should return a full list for a matcher that returns true', () => {
      const results = searchObjects(currencies, [() => true]);
      expect(results.length).toBe(3);
    });

    it('should return a full list for a matcher that returns false', () => {
      const results = searchObjects(currencies, [() => false]);
      expect(results.length).toBe(0);
    });

    it('should return filter based on a macther', () => {
        const currencyMatcher = keyMatcher('currency', 'EUR')
        const results = searchObjects(currencies, [currencyMatcher]);
        expect(results.length).toBe(1);
    });
});


describe('KeyMatcher', () => {
    it('should return true if input object has a value that matches the search term ' , () => {
        const match = keyMatcher('currency', 'EUR', {currency: 'EUR'})
        expect(match).toBe(true);
    });
    
    it('should return true if input object has a value where search term  is substring' , () => {
        const match = keyMatcher('currency', 'EU', {currency: 'EUR'})
        expect(match).toBe(true);
    });

    it('should return false if input object does not have a value that matches the search term ' , () => {
        const match = keyMatcher('currency', 'EUR', {currency: 'USD'})
        expect(match).toBe(false);
    });

    it('should return false if input object does not have a key that matches the input key ' , () => {
        const match = keyMatcher('currency', 'EUR', {name: 'US Dollar'})
        expect(match).toBe(false);
    });

    it('should return false if input objects key is not a string' , () => {
        const match = keyMatcher('currency', 'EUR', {currency: 0})
        expect(match).toBe(false);
    });

    
});
