import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { Async } from '../api/async';
import { IApi } from '../api/index';

type LastLoaded = 'rates' | 'ratesForDate';

export class FxRatesStore {
  @observable lastLoaded: LastLoaded = undefined;

  @observable rates = new Async(this.api.fixer.getLatestRates);

  @observable ratesForDate = new Async(this.api.fixer.getRatesForDate);

  constructor(private api: IApi) {}

  @asyncAction *loadRates() {
    yield this.rates.run();
    this.lastLoaded = 'rates';
  }

  @asyncAction *loadRatesForDate(date: string) {
    yield this.ratesForDate.run(date);
    this.lastLoaded = 'ratesForDate';
  }
}