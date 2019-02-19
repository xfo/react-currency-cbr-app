import { combineReducers } from 'redux';
import currencyListReducer from './currencyList';
import currencyChartDataReducer from './currencyChartData';

export default combineReducers({
    currencyList: currencyListReducer,
    currencyChartData: currencyChartDataReducer
})