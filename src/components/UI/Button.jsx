export default function Button({children, textOnly, className, ...props}) {

    //eite auto:
    // let cssClasses = textOnly ? 'text-button' : 'button';
    // cssClasses += '' +  className;
    //eite auto:
    let cssClasses = textOnly ? `text-button ${className}` : `button ${className}`;


    return (
        <button className={cssClasses} {...props} >
            {children}
        </button>
    )
}



