import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore
import debounce from 'lodash.debounce';
import  Currency from '../classes/currency';
import { URLHandler } from './urlHandler';
import { searchObjects, keyMatcher } from '../utils';
import { CurrencyTable } from './currencyTable';


type CurrencyFilterProps = {
  fx: Array<Currency>,
  matchers: Array<Function>
  searchTerm: string
}

const i18NMatcher = keyMatcher('name18N');
const currencyMatcher =  keyMatcher('currency');
const currencyFullMatcher =  keyMatcher('countryFull');

CurrencyFilter.defaultProps = {
    matchers: [i18NMatcher, currencyMatcher, currencyFullMatcher],
    searchTerm: ''
}

export function CurrencyFilter(props: CurrencyFilterProps) {
    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const [inputValue, setInputValue] = useState(props.searchTerm);
    const results = useMemo(() => {
        return searchObjects(props.fx, props.matchers.map(matcher => matcher(searchTerm))) as Array<Currency>;
    }, [searchTerm]);

    // Offer possibility for debouncing incase the currency list gets huge. 
    const debouncedSetValue = useCallback(debounce((value: string) => setSearchTerm(value), 0),[]);
	const handleInputChange = (event: React.FormEvent)  => {
        const { value } = (event.target) as HTMLInputElement;
        setInputValue(value);
		debouncedSetValue(value);
    };
    
    return (
        <>
            <URLHandler hash={searchTerm} />
            <div className="panel is-sticky is-top">
                <div className="panel-block ">
                    <input className="input is-info" type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />
                </div>
            </div>
            <div className="container">
                <CurrencyTable fx={results} />
            </div>
        </>
    );
}

