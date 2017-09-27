import { observable, action, computed } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { Async } from '../api/async';
import { IApi } from '../api/index';
import { ILogin } from '../api/security';

const USER_ID = 'userId';

export class SecurityStore {
  @observable userId: string = null;

  @observable loginResult = new Async(this.api.security.createToken);

  @computed get isLoggedIn() {
    return !!this.userId;
  }

  constructor(private api: IApi) {
    this.bootstrap();
    window.addEventListener('storage', (event: StorageEvent) => {
      this.userId = event.newValue;
    });
  }

  bootstrap() {
    const userId = window.localStorage.getItem(USER_ID);
    if (userId) {
      this.userId = userId;
    }
  }

  @asyncAction *login(login: ILogin) {
    const { response } = yield this.loginResult.run(login);
    if (response) {
      this.userId = response.userId;
      window.localStorage.setItem(USER_ID, this.userId);
    }
  }

  @action logout() {
    this.loginResult.reset();
    this.userId = null;
    window.localStorage.removeItem(USER_ID);
  }
}