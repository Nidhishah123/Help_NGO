/**
 * Created by lcom71 on 18/8/17.
 */
import {
    createStore,
    compose,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk))
);

export default store;