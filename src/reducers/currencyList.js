import _ from 'lodash';
import {
    CURRENCY_LIST_FETCH_IS_LOADING,
    CURRENCY_LIST_FETCH_SUCCESS,
    ADD_CURRENCY_TO_FAVORITES,
    REMOVE_CURRENCY_FROM_FAVORITES,
    SELECT_CURRENCY_FROM_LIST
} from '../actions/actionTypes';

const savedFavorites = JSON.parse(localStorage.getItem('favorites'));

const initialState = {
    currencies: [],
    favorites: savedFavorites ? savedFavorites : [],
    selected: '',
    isLoading: false
};

const currencyList = (state = initialState, action) => {
	switch (action.type) {
		case CURRENCY_LIST_FETCH_IS_LOADING:
			return {
                ...state,
				isLoading: action.bool
            };
        case CURRENCY_LIST_FETCH_SUCCESS:
            return {
                ...state,
                currencies: action.payload
            };
        case ADD_CURRENCY_TO_FAVORITES:
            let newFavorites = _.uniq([ ...state.favorites, action.id ]);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return {
                ...state,
                favorites: newFavorites
            };
        case REMOVE_CURRENCY_FROM_FAVORITES:
            let newFavors = _.difference(state.favorites, [action.id]);
            localStorage.setItem('favorites', JSON.stringify(newFavors));
            return {
                ...state,
                favorites: newFavors
            };
        case SELECT_CURRENCY_FROM_LIST:
            return {
                ...state,
                selected: action.id
            };
		default:
			return state;
	}
};

export default currencyList;