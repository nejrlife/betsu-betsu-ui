import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import About from '../../../src/pages/About/About';
import { MemoryRouter } from 'react-router-dom';

const initMockRetrieveUserDetailsCustomerState = {
  id: 'IJ101',
  name: 'Tom Jha',
  last_login: '04 Feb 2018',
  balance: '£3000',
  transaction: [
    {
      amount: '£700',
      date: '01 Feb 2018',
      desc: 'Room Rent'
    },
    {
      amount: '£40',
      date: '02 Feb 2018',
      desc: 'Morrison'
    }
  ]
};

const initMockAuthenticateUserDetailsState = {
  userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiSUoxMDEiLCJpYXQiOjE2OTUyMDQ2ODksImV4cCI6MTY5NTIwNDY5OX0.eQgS_J9LYjLLJHSIEkM9R6rFcCpGJs0fhRtzxYYEhQk',
  customerId: 'IJ101',
  isUserAuthenticated: true,
  logInError: '',
  logInPending: false,
  isAuthenticatedError: '',
  isAuthenticatedPending: false
};

const INITIAL_STATE = {
  authenticateUser: { ...initMockAuthenticateUserDetailsState },
  retrieveUserDetails: {
    customer: { ...initMockRetrieveUserDetailsCustomerState },
    retrieveUserDetailsError: '',
    retrieveUserDetailsPending: false
  }
}

const mockStore = configureStore([]);

test('should render About page', () => {
  const store = mockStore(INITIAL_STATE);
  const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <About />
        </Provider>
      </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Fix import React issue', () => {
  console.log(React);
});