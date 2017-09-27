import * as fixer from './fixer';
import { SecurityStore } from './security';
import { IConfig } from '../config';

export interface IApi {
    fixer: typeof fixer;
    security: SecurityStore;
}

export const makeApi = (config: IConfig): IApi => ({
    fixer,
    security: new SecurityStore(config)
});
