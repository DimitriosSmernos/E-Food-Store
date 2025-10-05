
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// thelo na xrisimopoieiso to portal dialog etsi oste na provalo to Modal se opoio simeio toy component tree, 
// alla na kano to dialog inject se sigkekrimeni thesi sto real DOM
// sigkekrimena thelo na to kano inject mesa sto index.html sto div me id modal
export default function Modal({ children, open, onClose, className='' }) {
    //xrisimopoio to useRef gia na exw prosbash sto dialog kai na mporw na kano close to modal otan patithei to escape
    const dialog = useRef();

    //gia na elegxw ean to dialog einai anoikto i oxi
    useEffect(() => {
        const modal = dialog.current;
        if (open) {   
            modal.showModal();//gia na anoiksei to dialog
        }   

        //pakato einai clean up function pou tha trexei otan to useEffect tha ksanatrexei 
        //i otan to component pou xrisimopoiei to Modal tha apothikeutei
        return () => {
            modal.close();//gia na kleisei to dialog
        }


    }, [open]);

  return createPortal(
    // <dialog open={open}> //to na elegxo ean anoigei i oxi to dialog to kanw apo ekei pou to xrisimopoiw, 
    // alla leei oti exei ena bug , opote tha to elegxo me to useEffect parapano
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
        {children}
    </dialog>, 
    document.getElementById('modal'));
}


