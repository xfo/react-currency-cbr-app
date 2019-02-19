import React, { Component } from 'react';

import Chart from './Chart';
import CurrencyTable from './CurrencyTable';

class Home extends Component {
  render() {
    return (
      <div className='app-wrapper'>
        <CurrencyTable />
        <Chart />
      </div>
    );
  }
}

export default Home;