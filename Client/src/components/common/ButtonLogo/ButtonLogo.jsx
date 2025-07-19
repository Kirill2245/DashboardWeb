import  './ButtonLogo.css'

const ButtonLogo = ({text, image ,styles} ) => {
    
    return(
        <button className= {`button-logo ${styles}`}>
            <img src = {image}></img>
            <span>{text}</span>
        </button>
    )
}

export default ButtonLogo