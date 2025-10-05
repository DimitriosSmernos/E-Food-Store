import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    // isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  //gia na katharizei to kalathi afou ekana tin afora
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();

    //edo svinoyme ta data , gia na mporesoyme na xanarxisoyme apo thn arxi ean kanoyme kai alli paraggelia
    clearData();
  }
  //epeidi to girisame meta me form actions kai xrisimopoiisame to useActionState 
  //prepei stin function poy kalei na exei proto to prevState kai na einai deutero to formdata:fd
  async function checkoutAction(prevState, fd) {
    // 1os tropos
    // //kanoyme to prevent Default gia na min ginei aytomata apo thn form to request
    // event.preventDefault();
    // //gia na piasoume ta input toy xristi , xrisimopoioume to FormData
    // const fd = new FormData(event.target);
    //kai meta kanoyme Object poy periexei ola ta entries
    // const costumerData = Object.fromEntries(fd.entries()); // etsi tha einai : { full-name:Dimitris, email: 1@gmail.com, street:st.xonoy, .... }

    //2os tropos
    const costumerData = Object.fromEntries(fd.entries()); // etsi tha einai : { full-name:Dimitris, email: 1@gmail.com, street:st.xonoy, .... }

    // // AYTOS EINAI O PROTOS TROPOS NA POST THN PARAGELIA
    //   //tha kanoume post sto backend edo , na kataxorithei i paraggelia
    //   fetch("http://localhost:3000/orders", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     //to body einai ta dedomena poy tha pane sto backend, to stringify ta kanei json
    //     body: JSON.stringify({
    //       //ta kanoume etsi gia simbadizoyn me ayta poy zitaei to backend
    //       order: {
    //         items: cartCtx.items,
    //         customer: costumerData, //kai akoma na simbadizoun ta name apo ta inputs
    //       },
    //     }),
    //   });

    // AYTOS EINAI O DEYTEROS TROPOS NA KANO POST
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: costumerData,
        },
      })
    );
  }
  //epeidi xrisimopoio form mporo na kano to useActionState kai na paro piso ta parakato 
  //3 antikeimena (to pending:isSending einai true i false)
  const [formState, formAction, isSending] = useActionState(checkoutAction, null);
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!!</h2>
        <p>Your order was submited succesfully!</p>
        <p>We will get back to you with more details via email!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
