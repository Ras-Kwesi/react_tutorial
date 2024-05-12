const reducer = (state = {}, action) => {
    const { names, location, issue, id } = action;
    switch (action.type) {
        case 'ADD_TICKET':
            return Object.assign({}, state, { // , we don't want to mutate objects in pure functions. Instead, we use Object.assign() to clone the state object and an empty object is used for cloning to avoid mutation
                [id]: {
                    names: names,
                    location: location,
                    issue: issue,
                    id: id
                }
            });

        case 'DELETE_TICKET':
            let newState = { ...state };
            delete newState[id];
            return newState;
            
        default:
            return state;
    }
};

export default reducer;