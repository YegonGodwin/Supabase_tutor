import '../index.css'

const SmoothieCard = ({ smoothie }) => {
    return (
        <div>
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div>{smoothie.rating}</div>
        </div>
    )
}

export default SmoothieCard;