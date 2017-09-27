import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Stores } from '../../stores';
import { SecurityStore } from '../../stores/securityStore';

export interface ILoginPageProps extends RouteComponentProps<{}> {
    securityStore: SecurityStore;
}

interface IState {
    username: string;
    password: string;
    redirectToReferrer: boolean;
}

@inject((stores: Stores) => ({
    securityStore: stores.securityStore
}))
@observer
export class LoginPage extends React.Component<ILoginPageProps, IState> {

    state = {
        username: '',
        password: ''
    } as IState;

    handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value: username } } = event;
        this.setState(_prevState => ({
            username
        }));
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value: password } } = event;
        this.setState(_prevState => ({
            password
        }));
    }

    handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { securityStore } = this.props;
        const { username, password } = this.state;
        await this.props.securityStore.login({
            username, password
        });
        if (securityStore.userId) {
            this.setState(_prevState => ({ redirectToReferrer: true }));
        }
    }

    render() {
        const { loginResult } = this.props.securityStore;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <form>
                    <input type="text" value={this.state.username} name="username" id="" onChange={this.handleUsernameChange} />
                    <input type="password" value={this.state.password} name="password" id="" onChange={this.handlePasswordChange} />
                    <button onClick={this.handleLogin}>Login</button>
                </form>
                {loginResult.isRequesting ? <div>Loading....</div> : null}
                {loginResult.error ? <div>Login failed with this message: {loginResult.error}</div> : null}
            </div>
        );
    }
}
