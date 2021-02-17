import React, { useEffect, useState } from 'react';
import { CurrencyConverter } from './components/currencyConverter';
import { RawCurrencyData } from './types';
import Currency from './classes/currency';


const fetchData = async () : Promise<any> => {   
  const response = await fetch('https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343');
  const data = await response.json();
  return data;
}

type AppProps = {
  fetchData: Function,
}

function App ({fetchData}: AppProps) {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await fetchData();
        setCurrencies(data.fx
          // Remove allt currencies that do not have an exchange rate
          .filter((item: RawCurrencyData) => item.exchangeRate)
          .map((item: RawCurrencyData) => new Currency(item)));
        setMeta({ lastUpdated: data.lastUpdated, baseCurrency: data.baseCurrency, comparisonDate: data.comparisonDate, institute: data.institute });
        setLoading(false);
      } catch (error) {
        // TODO Send error to Error monitor
        console.log(error);
        setError(error);
      }
    }
    fetchCurrencies();
  }, [])
  return (
    <>
      <header className="hero is-info">
        <div className="hero-body">
          <h1 className="title">+
            George FE Test
          </h1> 
        </div>
      </header>
        {currencies.length > 0 && <CurrencyConverter searchTerm={window.location.hash.replace('#', '')} fx={currencies} />}
        {loading && <div className="fixed-center">Loading</div>}
        {error && <div>Stuff Went bananas - it's not you, its us.</div>}
    </>
  );
}

App.defaultProps = {
  fetchData: fetchData
}

export default App;
