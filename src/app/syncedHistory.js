// @flow weak
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './redux/store/configureStore';
import { createBrowserHistory } from 'history';

const history       = createBrowserHistory();
export const store         = configureStore();
export const syncedHistory = syncHistoryWithStore(history, store);
