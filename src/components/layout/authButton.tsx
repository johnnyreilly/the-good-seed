import * as React from 'react';
import {
    withRouter,
    Link,
    RouteComponentProps
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { SecurityStore } from '../../stores/securityStore';
import { Stores } from '../../stores';

interface IAuthButtonProps extends RouteComponentProps<{}> {
    securityStore: SecurityStore;
}

@withRouter
@inject((stores: Stores) => ({
    securityStore: stores.securityStore
}) as IAuthButtonProps)
@observer
export class AuthButton extends React.Component<Partial<IAuthButtonProps>> {
    handleLogout = (_e: React.MouseEvent<HTMLButtonElement>) => {
        const { history, securityStore } = this.props;
        securityStore.logout();
        history.push('/');
    }

    render() {
        const isLoggedIn = !!this.props.securityStore.userId;
        const { pathname } = this.props.location;
        
        return isLoggedIn
            ? (
                <p>
                    Welcome!
                    <button onClick={this.handleLogout}>
                        Sign out
                    </button>
                </p>
            )
            : (
                <p>You are not logged in. {
                    pathname === '/login'
                        ? null
                        : <Link to="/login">Login!</Link>
                }</p>);
    }
}
