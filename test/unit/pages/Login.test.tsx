import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import Login from '../../../src/pages/Login/Login';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

const initAuthenticateUserDetailsState = {
  userToken: '',
  customerId: '',
  isUserAuthenticated: false,
  logInError: '',
  logInPending: false,
  isAuthenticatedError: '',
  isAuthenticatedPending: false
};

const INITIAL_STATE = {
  authenticateUser: { ...initAuthenticateUserDetailsState },
}

const mockStore = configureStore([]);

test('should render Login page and components', () => {
  const store = mockStore(INITIAL_STATE);
  const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
  );
  const buttonElement = screen.getByText('Log In');
  const useridFieldElement = screen.getByPlaceholderText('Password');
  const pwfieldElement = screen.getByPlaceholderText('Enter User ID');
  
  expect(buttonElement).toBeInTheDocument();
  expect(useridFieldElement).toBeInTheDocument();
  expect(pwfieldElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test('Fix import React issue', () => {
  console.log(React);
});