import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <p>Sorry, the page you're attempting to access does not exist. Please return to our <Link to="/">Homepage</Link>.</p>
        </div>
    )
}

export default ErrorPage;