

const initialState = {
    user:{}
}
const userReducer = (state = initialState, action) => {
    console.log('user reducer',action.payload,action.type)
    switch(action.type) {
        case "Login_Success": return{ ...state, user:action.payload };
        case "Login_Fail": return{ ...state, user:{} };
        default: console.log("INSIDE USER REDUCER",state);
                return state;
    }
  
}

export default userReducer