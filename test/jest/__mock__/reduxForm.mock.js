import React from 'react';
import {
  reduxForm,
  reducer as formReducer,
} from 'redux-form';
import {
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';

export const reduxFormMock = (component, initialStateValues = {}, formFieldValues = {}) => {
  const onSubmit = jest.fn();
  const fieldReducer = (state = initialStateValues, { type }) => {
    switch (type) {
      default:
        return state;
    }
  };
  const reducer = combineReducers({
    field: fieldReducer,
    form: formReducer,
  });
  const store = createStore(reducer);

  const Decorated = reduxForm({
    form: 'testForm',
    onSubmit: { onSubmit },
  })(component);

  return (
    <Provider store={store}>
      <Decorated
        {...formFieldValues}
      />
    </Provider>
  );
};
