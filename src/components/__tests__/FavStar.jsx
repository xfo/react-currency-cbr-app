import React from 'react';
import ReactDOM from 'react-dom';
import FavStar from '../FavStar';

describe('render FavStar', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FavStar/>, div);
    });
});