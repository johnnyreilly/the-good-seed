import * as React from 'react';
import {
    withRouter,
    Route,
    Link,
    RouteComponentProps
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { fxRatesPath, FxRatesPage } from './components/fxRates';
import { aboutPath, AboutPage } from './components/about';
import { topicsPath, TopicsPage } from './components/topics';
import { loginPath, LoginPage } from './components/login';
import { Stores } from './stores';
import { SecurityStore } from './stores/securityStore';
import { AuthButton } from './components/layout/authButton';

interface IProps extends RouteComponentProps<{}> {
    securityStore: SecurityStore;
}

@withRouter
@inject((stores: Stores) => ({
    securityStore: stores.securityStore
}))
@observer
export class App extends React.Component<Partial<IProps>> {

    publicLinks = [
        { path: aboutPath, title: 'About' },
    ].map(this.renderLink);

    privateLinks = [
        { path: topicsPath, title: 'Topics' },
        { path: fxRatesPath, title: 'FX Rates' }
    ].map(this.renderLink);

    publicRoutes = [
        { path: loginPath, component: LoginPage },
        { path: aboutPath, component: AboutPage }
    ].map(this.renderRoute);

    privateRoutes = [
        { path: topicsPath, component: TopicsPage },
        { path: fxRatesPath, component: FxRatesPage }
    ].map(this.renderRoute);

    renderLink({ path, title }: { path: string, title: string }) {
        return (
            <li key={path}><Link to={path}>{title}</Link></li>
        );
    }

    renderRoute({ path, component }: { path: string, component: React.ComponentType<RouteComponentProps<any> | {}> }) {
        return (
            <Route key={path} path={path} component={component} />
        );
    }

    render() {
        const isLoggedIn = this.props.securityStore.isLoggedIn;
        return (
            <div>
                <AuthButton />
                <ul>
                    {this.publicLinks}
                    {isLoggedIn
                        ? this.privateLinks
                        : null}
                </ul>

                {this.publicRoutes}
                {isLoggedIn
                    ? this.privateRoutes
                    : null}
            </div>
        );
    }
}
