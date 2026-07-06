export default function Input({label, id, ...props}) {

    return <p className="control">
        {/* vazoume sto label htmlFor=id gia na deixoume sto browser se pio id anaferomaste */}
        <label htmlFor={id}>{label}</label>
        {/* xrisimopoioye to name gia na mporesoyme na kanoyme hadle to submition toy form*/}
        <input id={id} name={id} required {...props}/>
    </p>
}
