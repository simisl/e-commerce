

const initialState = {
    order:[]
}
const orderReducer = (state = initialState, action) => {
    console.log('order reducer',action.payload,action.type)
    switch(action.type) {
        case "Order_Update": return{ ...state, 
                                    order:state.order.length ? 
                                    state.order.concat(action.payload):[...state.order,action.payload] };
        case "Order_Clear": return{ ...state, order:[] };
        default:  return state;
    }
  
}

export default orderReducer