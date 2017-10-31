import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const store = {categories: []};

it('renders without crashing', () => {
  expect(shallow(<App store={mockStore(store)}/>)).toMatchSnapshot();
});
