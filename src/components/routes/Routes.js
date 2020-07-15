import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {loggedIn} from "../shared/helpers/GeneralHelpers";
import {getLoggedInUser} from "../../actions/login/get_logged_in_user";
import store from "../../Store"
import ShowSnackbar from "../shared/messages/Snackbar";
import BounceLoader from "../shared/loaders/BounceLoader";
import FullPageLoader from "../shared/loaders/FullPageLoader";

const loading = () => <BounceLoader/>;

const Login = React.lazy(() => import('./../../views/Pages/Login'));
const Register = React.lazy(() => import('./../../views/Pages/Register'));
const Page404 = React.lazy(() => import('./../../views/Pages/Page404'));
const Page500 = React.lazy(() => import('./../../views/Pages/Page500'));
const DefaultLayout = React.lazy(() => import('./../../containers/DefaultLayout'));

class Routes extends Component {
  state = {
    user: {username: ''},
    window: {width: null},
    processing: false
  };

  componentDidMount() {
    if (loggedIn()) {
      store.dispatch(getLoggedInUser());
      if (!loggedIn()) {
        this.setState({
          processing: false
        })
      }
      if (loggedIn() && window.location.href.includes('login'))
      {
        this.props.history.push(`/dashboard`);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.getLoggedInUser !== prevProps.getLoggedInUser) {
      let {success} = this.props.getLoggedInUser;
      if (success) {
        let user = {...this.state.user};
        // store.dispatch(getRole(success.data.payload.id));
        user.name = success.data.full_name;
        this.setState({user});
      } else {
        //
      }
    }
  }

  render() {
    return (
      <div>
        {
          (() => {
            if (loggedIn()) { 
              return (
                <React.Suspense fallback={loading()}>
                  <Switch>
                    <Route path="/" name="Home" render={(props) => <DefaultLayout {...this.props}/>}/>
                  </Switch>
                </React.Suspense>
              )
              // }
            } else {
              return (
                <React.Suspense fallback={loading()}>
                  <Switch>
                    <Route exact path="/" render={(props) => <Login {...props}/>}/>
                    <Route exact path="/register" name="Register Page" render={(props) => <Register {...props}/>}/>
                    <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props}/>}/>
                    <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props}/>}/>
                    <Redirect to="/" />
                  </Switch>
                </React.Suspense>
              );
            }
          })()
        }
        <ShowSnackbar/>
        <FullPageLoader/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  let { getLoggedInUser } = { ...state }
  return {
    getLoggedInUser
  }
}

export default withRouter(connect(mapStateToProps)(Routes));
