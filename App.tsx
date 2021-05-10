/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/configureStore';

import Routes from './routes/index';
import React from 'react';
import ErrorBoundary from './helpers/ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
