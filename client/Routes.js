import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Home} from './components/Home';
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct';
import SelectedProduct from './components/SelectedProduct';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

    return (
      <div>
        {
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/products/:id" component={SelectedProduct} />
            <Route  path="/products" component={AllProducts} />
            
            <Redirect to="/home" />
          </Switch>
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
