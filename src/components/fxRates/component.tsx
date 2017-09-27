import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FxRatesStore } from '../../stores/fxRatesStore';
import { Stores } from '../../stores';
import { Rates } from './rates';

export interface IFxRatesProps {
    fxRatesStore: FxRatesStore;
}

interface IState {
    date: string;
}

@inject(
    (stores: Stores) => ({
        fxRatesStore: stores.fxRatesStore
    }) as IFxRatesProps
)
@observer
export class FxRatesPage extends React.Component<Partial<IFxRatesProps>, IState> {
    state = {
        date: '2012-06-15'
    } as IState;

    handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value: date } } = event;
        this.setState(_prevState => ({ date }));
    }

    handleLoadForDateClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.fxRatesStore.loadRatesForDate(this.state.date);
    }

    handleLoadLatestClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.fxRatesStore.loadRates();
    }

    render() {
        const { date } = this.state;
        const { rates, ratesForDate, lastLoaded } = this.props.fxRatesStore;
        return (
            <div>
                <h2>FX Rates</h2>
                Date: <input type="text" value={date} onChange={this.handleDateChange} />
                <button onClick={this.handleLoadForDateClick}>Load 'em up for given date</button>
                <button onClick={this.handleLoadLatestClick}>Load latest</button>
                Last loaded: {lastLoaded === 'ratesForDate' ? 'Rates for date' : lastLoaded === 'rates' ? 'Latest Rates' : null}

                {lastLoaded === 'ratesForDate' ? <Rates {...ratesForDate} /> : null}
                {lastLoaded === 'rates' ? <Rates {...rates} /> : null}

            </div>
        );
    }
}