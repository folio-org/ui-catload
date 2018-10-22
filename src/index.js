import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Home from './routes/Home';
import Results from './routes/Results';
import Settings from './settings';

class DataImport extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.connectedHome = props.stripes.connect(Home);
  }

  // wire up home page with stripes
  renderConnectedHome = () => {
    return <this.connectedHome {...this.props} />;
  };

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          exact
          render={this.renderConnectedHome}
        />
        <Route path={`${this.props.match.path}/results`} exact component={Results} />
      </Switch>
    );
  }
}

export default DataImport;
