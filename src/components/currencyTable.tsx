import React from 'react';
import  Currency from '../classes/currency';



type CurrencyTabelProps = {
  data: Array<Currency>,
}

export function CurrencyTable(props: CurrencyTabelProps) {
    return (
        <table className="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Country</th>
                    <th className="is-hidden-mobile">Name</th>
                    <th>Buy</th>
                    <th>Sell</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((item: Currency) => {
                    return (<tr key={item.currency}>
                        <td>{item.currency}</td>
                        <td>
                            {item.countryFull && (<div className="is-flex align-items">
                                <img className="is-hidden-mobile" style={{ width: '40px', marginRight: '10px' }} src={`/flags/${item.countryISO2?.toLowerCase()}.png`} />
                                {item.countryFull}
                            </div>)}
                        </td>
                        <td className="is-hidden-mobile">{item.nameI18N || 'Unknown'}</td>
                        <td>{item.buy}</td>
                        <td>{item.sell}</td>
                    </tr>);
                })}
            </tbody>
        </table>);
}