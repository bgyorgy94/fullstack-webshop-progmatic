import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <>
            <p>Ez lesz a kezdőoldal!</p>
            <Link to='/register'>Regisztráció</Link>
        </>
    )
}