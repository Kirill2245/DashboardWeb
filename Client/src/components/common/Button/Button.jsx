import  './Button.css'

const Button = ({text ,styles, onClick = () => {console.log('b')}}) => {
    
    return(
        <button className= {`button ${styles}`} onClick={onClick} >
            {text}
        </button>
    )
}

export default Button