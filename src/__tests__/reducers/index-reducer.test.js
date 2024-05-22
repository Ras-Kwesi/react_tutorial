import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from '../../actions/ActionTypes';

let store = createStore(rootReducer); // In effect, we are creating a little Redux application in our tests that is separate from our React application to perform a smoke test

describe('rootReducer', () => {

    test('Should return default state in fo action type is recognized', () => {
        expect(rootReducer({}, { type: null })).toEqual({
            mainTicketList: {},
            formVisibleOnPage: false
        });
        // expect(rootReducer({}, { type: null })).toEqual({ 
        // The first argument - {} - to the reducer is the initial state.
        // In this test case, it is an empty object {}. This represents the initial state of the entire Redux store when it is first created.
        // The second argument - {type:null} - is the action object. Actions in Redux typically have a type property that describes what kind of action is being performed. //
        // Here, { type: null } is used to simulate a situation where no valid action type is recognized by the reducer.
    });

    test('Check that initial state of ticketListReducer matches root reducer', () => {
        expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, { type: null }));
        console.log(store.getState())
    });

    test('Check that initial state of formVisibleReducer matches root reducer', () => {
        expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
    });

    test('Check that ADD_TICKET action works for ticketListReducer and root reducer', () => {
        const action = {
            type: c.ADD_TICKET,
            names: 'Ryan & Aimen',
            location: '4b',
            issue: 'Redux action is not working correctly.',
            id: 1
        }
        store.dispatch(action);
        expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, action));
    });

    test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
        const action = {
            type: c.TOGGLE_FORM
        }
        store.dispatch(action);
        expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action)); // form visible reducer handles two objects, state and action. As test is impelemented on initial state, the state is still undefined. 
    });
    ///Using undefined when calling formVisibleReducer ensures that the reducer uses its initial state (false). 
    // This test confirms that both the formVisibleReducer and the root reducer correctly handle the TOGGLE_FORM action by comparing the state from the store with the state directly returned by the reducer. 
    // This ensures consistency between individual reducers and the combined root reducer in the Redux store.







})