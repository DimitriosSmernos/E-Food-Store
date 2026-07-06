import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  // totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

//xrisimopoioyme to useReducer gia na diaxeiristw to state tou cart
//ka to kanei poli pio eukola kai pio apotelesmatika na allazw to state kai exo apo to component mou
//Dexetai to proigoumeno state kai to action pou theloume na kanoume kai epistrefei to updated state
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    //kanoume ena neo array me ta items pou exei to cart
    const updatedItems = [...state.items];
    //ean to antikeimeno exei mono 1 posotita tote to afairw apo to cart
    if (existingCartItem.quantity === 1) {
      //kai afairoume to item pou theloume na afairesoume
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      //ean iparxei perissotera apo 1 tote meiwno tin posotita kata 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

//prepei na kanoume ena context provider component gia na tilixo sto app.jsx ola ta components
//pou xreiazontai to context
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  // console.log(cartContext);
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
