

const reducer = (state = false, action) => { // Takes state, if not provided its default is false
    switch (action.type) {
        case 'TOGGLE_FORM':
            console.log(!state)
            return !state;
        default:
            return state;
    }
};

export default reducer;