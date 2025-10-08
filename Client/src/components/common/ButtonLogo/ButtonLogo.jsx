import  './ButtonLogo.css'

const ButtonLogo = ({text, image ,styles , onClick = () => {console.log(true)}, type="submit"} ) => {
    
    return(
        <button className= {`button-logo ${styles}`} onClick={onClick} type={type}>
            <img src = {image}></img>
            <span>{text}</span>
        </button>
    )
}

export default ButtonLogo