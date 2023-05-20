

const initialState = {
    cart:[],
    totalPrice: 0
}

const cartReducer = (state=initialState, action) => {
    console.log('totalprice', state.totalPrice)
    if(action.type === 'Cart_Update'){
        console.log('ne if',state,state.cart,state.cart.length)
        if(!state.cart.length){
            console.log('cart is []')
            return{...state, 
                    cart:[...state.cart,action.payload],
                    totalPrice:  state.totalPrice + (action.payload.totalPrice * action.payload.quantity)}
        }
        else{
            console.log("item exists in cart")
            const item = state.cart.find(item=>item.id === action.payload.id);
            if(item){
                return {...state,
                    cart: state.cart.map(item=>item.id === action.payload.id ?
                           {...item, quantity:item.quantity+action.payload.quantity, totalPrice: (item.quantity+1)*item.price}:item),
                    totalPrice: state.totalPrice + (action.payload.totalPrice * action.payload.quantity)
                    }
            }
            return {...state,
                    cart: state.cart.concat(action.payload),
                    totalPrice: state.totalPrice + (action.payload.totalPrice * action.payload.quantity)
                }
            
    }
}

    else if(action.type === 'Cart_Remove'){
       console.log("cart remove",action.payload) 
      
        return {
            ...state,
            cart: state.cart.filter(item=>item.id !== action.payload.id),
            totalPrice: state.totalPrice - action.payload.totalPrice
        }

    }

    else if(action.type === 'Cart_Clear'){
        return {
            ...state,
            cart: [],
            totalPrice: 0
        }

    }
   
    else{
        return state;
    }
  
}

export default cartReducer