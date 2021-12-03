import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="errorPage">
            <h3>Page not found</h3>
            <p>Sorry, the page you're attempting to access does not exist. Please return to our <Link to="/" className="errorRedirect">Homepage</Link>.</p>
        </div>
    )
}

export default ErrorPage;