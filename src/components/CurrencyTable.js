import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import {
  currencyListLoad,
  addCurrencyListToFavorites,
  removeCurrencyFromFavorites,
  selectCurrencyFromList
} from "../actions";
import FavStar from "./FavStar";
import Loader from "./Loader";

const mapStateToProps = ({ currencyList }) => {
  const { currencies, favorites, selected, isLoading } = currencyList;

  return {
    currencies,
    favorites,
    selected,
    isLoading
  };
};

class CurrencyTable extends Component {
  componentDidMount() {
    this.props.currencyListLoad();
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }

    if (this.props.currencies.length <= 0) return null;

    const favoriteList = this.props.favorites.map(favId => {
      return _.find(this.props.currencies, { ID: favId });
    });

    const usualList = this.props.currencies.filter(currency => {
      return this.props.favorites.indexOf(currency.ID) === -1;
    });

    const processedCurrencyList = [...favoriteList, ...usualList];

    return (
      <table className="currency-table-wrapper">
        <tbody>
          {processedCurrencyList.map(currency => {
            const { ID, Name, Nominal, Value } = currency;
            const isFavorite = this.props.favorites.indexOf(ID) !== -1;
            const isChoosen = ID === this.props.selected;

            return (
              <tr key={ID} className={isChoosen ? "is-choosen" : null}>
                <td>
                  {Nominal} {Name}
                </td>
                <td>= {Value} ₽</td>
                <td>
                  {isFavorite ? (
                    <button
                      onClick={() => {
                        this.props.removeCurrencyFromFavorites(ID);
                      }}
                    >
                      <FavStar active />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        this.props.addCurrencyListToFavorites(ID);
                      }}
                    >
                      <FavStar />
                    </button>
                  )}
                </td>
                <td>
                  {!isChoosen && (
                    <button
                      className="select-currency-button"
                      onClick={() => {
                        this.props.selectCurrencyFromList(ID);
                      }}
                    >
                      Просмотр
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

CurrencyTable.propTypes = {
  currencies: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  {
    currencyListLoad,
    addCurrencyListToFavorites,
    removeCurrencyFromFavorites,
    selectCurrencyFromList
  }
)(CurrencyTable);
