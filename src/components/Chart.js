import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "./Loader";

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class Chart extends Component {
  render() {
    const { data, isLoading } = this.props;

    if (isLoading) return <Loader />;
    if (data.length <= 0) return null;

    const preparedData = data.map(record => {
      return {
        date: record.Date,
        value: parseFloat(record.Value.replace(",", "."))
      };
    });

    return (
      <div className="chart-wrapper">
        <div className="chart-fixed-wrapper">
          <ResponsiveContainer height="100%">
            <LineChart
              data={preparedData}
              margin={{ top: 40, right: 40, left: 0, bottom: 40 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#013c28" strokeDasharray="3 3" />
              <Legend />
              <Tooltip labelStyle={{ color: "#caad89" }} />
              <Line type="monotone" dataKey="value" stroke="#000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currencyChartData }) => {
  const { data, isLoading } = currencyChartData;

  return {
    data,
    isLoading
  };
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Chart);
