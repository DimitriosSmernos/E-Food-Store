import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext  from '../store/UserProgressContext';


export default function Header() {
    const userProgressCtx = useContext(UserProgressContext);

    const cartCtx = useContext(CartContext);
    //reduce einai mia built it function pou pairnei ena array kai to meiwnei se mia monadiki timi
    //to prwto orisma einai mia callback function pou pairnei dyo orismata: 
    //to current number(i timi poy theloyme na toy dosoume) 
    //kai to item(kathe ena item apo to array items),
    //to deutero orisma einai to arxiko value tou current number: 0
    //edw meiwno to array twn items se ena monadiko arithmo pou einai to athroisma twn posotitwn
    //twn antikeimenwn pou exei to cart. 
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);


    function handleShowCart() {
        userProgressCtx.showCart();
    }


    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>E-FOODDYY</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
  );

}