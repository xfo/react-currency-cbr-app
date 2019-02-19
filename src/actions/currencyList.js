import axios from "axios";
import _ from "lodash";
import {
  CURRENCY_LIST_FETCH_IS_LOADING,
  CURRENCY_LIST_FETCH_SUCCESS,
  ADD_CURRENCY_TO_FAVORITES,
  REMOVE_CURRENCY_FROM_FAVORITES,
  SELECT_CURRENCY_FROM_LIST
} from "./actionTypes";

import { currencyChartDataLoad } from './currencyChartData';

export const currencyListFetchIsLoading = bool => ({
  type: CURRENCY_LIST_FETCH_IS_LOADING,
  bool
});

export const currencyListFetchSuccess = payload => ({
  type: CURRENCY_LIST_FETCH_SUCCESS,
  payload
});

export const addCurrencyListToFavorites = id => ({
  type: ADD_CURRENCY_TO_FAVORITES,
  id
});

export const removeCurrencyFromFavorites = id => ({
  type: REMOVE_CURRENCY_FROM_FAVORITES,
  id
});

export const selectCurrencyFromList = id => dispatch => {
	dispatch({ type: SELECT_CURRENCY_FROM_LIST, id });
	dispatch(currencyChartDataLoad(id));
};

export const currencyListLoad = () => dispatch => {
  dispatch(currencyListFetchIsLoading(true));

  axios
    .get("http://localhost:3333/")
    .then((res, err) => {
      const currencies = _.get(res, "data.ValCurs.Valute", []);
      dispatch(currencyListFetchSuccess(currencies));
      dispatch(currencyListFetchIsLoading(false));
    })
    .catch(err => {
      alert(err);
      dispatch(currencyListFetchIsLoading(false));
    });
};