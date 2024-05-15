import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({           // combineReducers() takes an object as an argument. That object contains key-value pairs. 
    formVisibleOnPage : formVisibleReducer,
    mainTicketList : ticketListReducer,
})

export default rootReducer;