import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  // AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import BounceLoader from "../../components/shared/loaders/BounceLoader";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

function filterNav(permissions){
  let navOption = navigation.items.filter(i => {
    let allowedPerm = permissions.find(j => {
      if (i.allowed) {
        return j.name === i.allowed
      } else {
        let childs = [...i.children]
        let childOptions = childs.filter(k => {
          let allowedChild = permissions.find(j => j.name === k.allowed)
          if (allowedChild) { return k }
          else { return false }
        })
        i.children = childOptions
        return childOptions.length > 0
      }
    })
    if (allowedPerm) {
      return i
    } else if (i.name === "Dashboard") {
      return i
    } else return false
  })

  return {items: navOption}
}

class DefaultLayout extends Component {
  state = {
    navConfig: navigation
  }

  componentDidMount(){
    const { permissions } = this.props.getLoggedInUser
    if(permissions){
      let navs = filterNav(permissions)
      this.setState({navConfig : navs})
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.getLoggedInUser !== prevProps.getLoggedInUser) {
      const { permissions } = this.props.getLoggedInUser
      if(permissions){
        let navs = filterNav(permissions)
        this.setState({navConfig : navs})
      }
    }
  }

  loading = () => <BounceLoader margin="0px"/>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          {/* <Suspense  fallback={this.loading()}> */}
            <DefaultHeader onLogout={e=>this.signOut(e)} history={this.props.history} />
          {/* </Suspense> */}
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.state.navConfig} location={this.props.location} />
            </Suspense>
            <AppSidebarFooter />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid className="px-3">
              <Suspense fallback={this.loading()}>
                <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
