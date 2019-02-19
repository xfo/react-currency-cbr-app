import axios from 'axios';
import _ from 'lodash';
import {
    CURRENCY_CHART_DATA_FETCH_IS_LOADING,
    CURRENCY_CHART_DATA_FETCH_SUCCESS
} from './actionTypes';

export const currencyChartDataFetchIsLoading = bool => ({ type: CURRENCY_CHART_DATA_FETCH_IS_LOADING, bool });
export const currencyChartDataFetchSuccess = payload => ({ type: CURRENCY_CHART_DATA_FETCH_SUCCESS, payload });

export const currencyChartDataLoad = (id) => (dispatch) => {
    dispatch(currencyChartDataFetchIsLoading(true));

    axios.get(`http://localhost:3333/currency?code=${ id }&dateStart=12/12/2018&dateEnd=15/02/2019`)
        .then((res, err) => {
            const data = _.get(res, 'data.ValCurs.Record', []);
            dispatch(currencyChartDataFetchSuccess(data));
            dispatch(currencyChartDataFetchIsLoading(false));
        })
        .catch((err) => {
            alert(err);
			dispatch(currencyChartDataFetchIsLoading(false));
		});
};