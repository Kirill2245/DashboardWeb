import  './Button.css'

const Button = ({text ,styles}) => {
    
    return(
        <button className= {`button ${styles}`}>
            {text}
        </button>
    )
}

export default Button