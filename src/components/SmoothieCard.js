import '../index.css'
import { Link } from 'react-router-dom';

const SmoothieCard = ({ smoothie }) => {
    return (
        <div>
            <h3 className='smoothie-card'>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className='rating'>{smoothie.rating}</div>
            <div className='buttons'>
                <Link to={`/${smoothie.id}`} className='button'>
                <i className='material-icons'>Edit</i></Link>
                <Link to={`/details/${smoothie.id}`} className='button'>Details</Link>
            </div>
        </div>
    )
}

export default SmoothieCard;