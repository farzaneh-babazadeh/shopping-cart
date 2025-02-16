import React,{useReducer,createContext} from 'react';
const initialState ={
    selectedItems:[],
    itemsCounter:0,
    total:0,
    checkout:false
}
const sumItems = items =>{
    const itemsCounter = items.reduce((total,product)=> total+product.quantity,0);
    const total = items.reduce((total,product)=> total+product.price*product.quantity,0).toFixed(2);
    return {itemsCounter,total}
   } 
const cartReducer = (state,action)=>{
      switch(action.type){
        case "ADD-ITEM":
            if(!state.selectedItems.find(item=>item.id === action.payload.id)){
                state.selectedItems.push({
                    ...action.payload,
                    quantity:1
                })
                
            }
            return {
                ...state,
                selectedItems:[...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout:false

            }

        case "REMOVE-ITEM": 
            const newselectedItems = state.selectedItems.filter(item=>item.id !== action.payload);
            return{
                ...state,
                selectedItems:[...newselectedItems],
                ...sumItems(newselectedItems)
            }
        case "INCREASE": 
             const indexI =  state.selectedItems.findIndex(item=> item.id=== action.payload.id);
             state.selectedItems[indexI].quantity++;
             
             return{
                ...state,
                ...sumItems(state.selectedItems)
             }
         case "DECREASE": 
         const indexD =  state.selectedItems.findIndex(item=> item.id=== action.payload.id);
             state.selectedItems[indexD].quantity--;
             return{
                ...state,
                ...sumItems(state.selectedItems)
             }  
             
        case "CHECKOUT" :
            return{
                selectedItems:[],
                itemsCounter:0,
                total:0,
                checkout:true
            }    
        case "CLEAR":
            return{
                selectedItems:[],
                itemsCounter:0,
                total:0,
                checkout:false
            }  
            
        default:
           return state;
    }   
}
export const cartContext = createContext()
const CartContexProvider = (props) => {
    const[state,dispatch]=useReducer(cartReducer,initialState);
    return (
     
            <cartContext.Provider value={{state ,dispatch}}>
                {props.children}
            </cartContext.Provider>
       
    );
};

export default CartContexProvider;