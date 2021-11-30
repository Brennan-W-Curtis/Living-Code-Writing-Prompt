const UserNotifications = ({ displayActivity, userActivity, activityFadingOut }) => {
    return (
        <>
            {
                displayActivity ?
                    <div className={!activityFadingOut ? "userNotifications fadeIn" : "userNotifications fadeOut"}>
                        <p>{userActivity}</p>
                    </div> :
                    null
            }
        </>
    )
}

export default UserNotifications;