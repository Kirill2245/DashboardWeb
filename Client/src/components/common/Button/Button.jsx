import  './Button.css'

const Button = ({text ,styles, onClick = () => {console.log('b')}}) => {
    
    return(
        <button className= {`button ${styles}`} onClick={onClick} type="button">
            {text}
        </button>
    )
}

export default Button