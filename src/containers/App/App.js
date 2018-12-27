import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { key } from '../../apikey';
import CardContainer from '../../containers/CardContainer/CardContainer';
import Menu from '../../components/Menu/Menu';
import Login from '../../containers/Login/Login';
import Favorites from '../../containers/Favorites/Favorites';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../../styles/main.scss';
import { fetchMovies } from '../../thunks/fetchMovies';
import { fetchFavorites } from '../../thunks/fetchFavorites';

export class App extends Component {
  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=10751`;
    this.props.fetchMovies(url);
  }

  componentDidUpdate() {
    if(this.props.user) {
      const userId = this.props.user.id
      this.props.addFavoritesToStore(userId)
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">
          <span className="movie">
            <Link to="/">Movie</Link>
          </span>
          <span className="stalker">
            <Link to="/">Stalker</Link>
          </span>
        </h1>
        <Menu />
        <Switch>
          <Route exact path="/" component={CardContainer} />
          <Route
            path="/login"
            render={({ match }) => {
              return <Login />;
            }}
          />
          <Route path="/favorites" component={Favorites} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMovies: url => dispatch(fetchMovies(url)),
  addFavoritesToStore: (userId) => dispatch(fetchFavorites(userId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

App.propTypes = {
  fetchMovies: PropTypes.func.isRequired
};