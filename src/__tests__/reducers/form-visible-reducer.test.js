import formVisibleReducer from '../../reducers/form-visible-reducer';

describe("formVisibleReducer", () => {

    test('Should return default state if no action type is recognized', () => {
        expect(formVisibleReducer(false, { type: null })).toEqual(false);
    });

    test('Should toggle form visibility state to true', () => {
        expect(formVisibleReducer(false, { type: 'TOGGLE_FORM' })).toEqual(true);
    });
    // The false in the test represents the initial state of the form visibility. 
    // When the TOGGLE_FORM action is dispatched, the reducer toggles this state from false to true, and the test verifies this behavior. 
    // This ensures that the reducer correctly toggles the form visibility state when the TOGGLE_FORM action is dispatched.
});