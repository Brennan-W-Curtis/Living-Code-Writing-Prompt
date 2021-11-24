// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserNotifications = ({ userActivity }) => {
    return (
        <div>
            {/* <FaCheckCircle />
            <FaTimesCircle /> */}
            <p>{userActivity}</p>
        </div>
    )
}

export default UserNotifications;