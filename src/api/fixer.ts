import { ajax, jsonHeaders } from './ajax';

export const getLatestRates = () => 
    ajax<IFxRates>('https://api.fixer.io/latest');

export const getRatesForDate = (date: string) =>
    ajax<IFxRates>('https://api.fixer.io/' + date);

// Not a real method - in place to demostrate how saves might be done
export const saveRates = (rate: IFxRates) =>
    ajax<IFxRates>('https://api.fixer.io/', { headers: jsonHeaders, method: 'POST', body: JSON.stringify(rate) });

export interface IFxRates {
    base: string;
    date: string;
    rates: { [ccy: string]: number };
}
