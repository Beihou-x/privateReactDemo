export default (state, action) => {
    if (!state) return {
        routes: []
    };
    switch (action.type) {
        case 'RENDERPATH':
            return { ...state, routes: action.routes };
        case 'FETCHROUTER':
            return { ...state, routes: action.routes };
        default:
            return state;
    }
}
