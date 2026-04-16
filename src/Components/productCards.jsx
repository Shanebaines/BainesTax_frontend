export default function ProductCard(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.price}</h2>
            <img src={props.img}></img>
            <button>Buy Now</button>    
        </div>
    )
}