import { combineReducers } from 'redux';

import userReducer from './userReducer';

const reducers = combineReducers({
  currentUser: {
    // all the info for the logged in user
  },
  lastSearchResults: [
    // array of user objects
  ],
  lastSearch: {
    // the search inputs for the last search
  },
});

export default reducers;
