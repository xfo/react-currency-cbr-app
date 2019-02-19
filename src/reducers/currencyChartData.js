import {
    CURRENCY_CHART_DATA_FETCH_IS_LOADING,
    CURRENCY_CHART_DATA_FETCH_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    data: [],
    isLoading: false
};

const currencyChartData = (state = initialState, action) => {
	switch (action.type) {
		case CURRENCY_CHART_DATA_FETCH_IS_LOADING:
			return {
                ...state,
				isLoading: action.bool
            };
        case CURRENCY_CHART_DATA_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
		default:
			return state;
	}
};

export default currencyChartData;