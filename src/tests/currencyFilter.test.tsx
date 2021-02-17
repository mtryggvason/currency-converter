import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CurrencyFilter } from '../components/currencyFilter';
import Currency from '../classes/currency';

const testCurrencies = [new Currency({currency: 'EUR', nameI18N: 'Euro'}), new Currency({currency: 'USD', nameI18N: 'US Dollar'})]
describe('Currency Converter Component', () => {
  it('should call matchers', () => {
    const mock = jest.fn(() => true);
    const mockMatcher = () => {
        return mock
    }
    render(<CurrencyFilter matchers={[mockMatcher]} fx={testCurrencies}/>);
    expect(mock).toBeCalled()
  });


  it('should display items who fit the matcher', () => {
      const mockMatcher = () => {
        return jest.fn(() => true);
      }
      render(<CurrencyFilter matchers={[mockMatcher]} fx={testCurrencies}/>);
      const euroElement = screen.queryAllByText(/Euro/i);
      expect(euroElement.length).toEqual(1)
  });


  it('should display not display any items if there is not match', () => {
      const mockMatcher = () => {
        return jest.fn(() => false);
      }
      render(<CurrencyFilter matchers={[mockMatcher]} fx={testCurrencies}/>);
      const euroElement = screen.queryAllByText(/Euro/i);
      expect(euroElement.length).toEqual(0)
  });

  it('should filter based on searchTerm assuming not other matchers are provided', () => {
      render(<CurrencyFilter fx={testCurrencies} searchTerm="USD" />);
      const euroElements = screen.queryAllByText(/Euro/i);
      const dollarElements = screen.queryAllByText(/USD/i);

      expect(euroElements.length).toEqual(0)
      expect(dollarElements.length).toEqual(1)
  });


  it('should not filter with empty string', () => {
      render(<CurrencyFilter fx={testCurrencies} searchTerm="" />);
      const euroElements = screen.queryAllByText(/Euro/i);
      const dollarElements = screen.queryAllByText(/USD/i);

      expect(euroElements.length).toEqual(1)
      expect(dollarElements.length).toEqual(1)
  });

    it('changing input should rerender the table', async () => {
      render(<CurrencyFilter fx={testCurrencies} searchTerm="" />);
      let euroElements = screen.queryAllByText(/Euro/i);
      let dollarElements = screen.queryAllByText(/USD/i);

      expect(euroElements.length).toEqual(1)
      expect(dollarElements.length).toEqual(1)

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'USD' } })
      // eslint-disable-next-line testing-library/await-async-utils
      waitFor(() => {
        euroElements = screen.queryAllByText(/Euro/i);
        dollarElements = screen.queryAllByText(/USD/i);
        expect(screen.getByRole('textbox')).toHaveValue('USD')
        expect(euroElements.length).toEqual(0)
        expect(dollarElements.length).toEqual(1)
      })
  });
});




