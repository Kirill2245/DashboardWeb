import  './ButtonLogo.css'

const ButtonLogo = ({text, image ,styles , onClick = () => {console.log(true)}} ) => {
    
    return(
        <button className= {`button-logo ${styles}`} onClick={onClick}>
            <img src = {image}></img>
            <span>{text}</span>
        </button>
    )
}

export default ButtonLogo