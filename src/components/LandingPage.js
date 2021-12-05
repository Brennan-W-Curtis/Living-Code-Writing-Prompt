import { useEffect } from 'react';
import { FaUserClock, FaHandHoldingHeart, FaHandsHelping, FaWalking, FaFileDownload, FaSpotify } from 'react-icons/fa';

const LandingPage = ({ animateIndicator, authenticatedUser, setUserActivity, setActivityFadingOut, displayActivity, setDisplayActivity }) => {

    // Briefly displays a notification that indicates to the user has successfully authenticated their identity.
    useEffect(() => {
   
        // Conditional statement that determines whether the notificaiton will display render to the page.
        if (authenticatedUser && displayActivity) {
            setUserActivity("Success, you're now signed in!")
            animateIndicator();
        } 

    }, [animateIndicator, authenticatedUser, displayActivity, setDisplayActivity, setUserActivity, setActivityFadingOut]);

    return (
        <div>
            <div className="productDescription">
                <h2>We Value Your Time</h2>
                <div className="descriptionContent">
                    <p>A modern journal that focuses on enhancing the user's experience with the flexibility to customize it's interface to align with their unique preferences.</p>
                    <p>Plume is a simple text editor designed for journalists to focus on their writing experiences by creating a constructive distraction free environment that also helps them set healthy boundaries.</p>
                </div>
            </div>
            <div className="productFeatures">
                <ul className="featuresList">
                    <li>
                        <FaUserClock className="featureIcon" />
                        <h3>Set and Forget</h3>
                        <p>Determine how long you would like to spend writing and we'll help you stay accountable to your target goals.</p>
                    </li>
                    <li>
                        <FaHandHoldingHeart className="featureIcon" />
                        <h3>Gentle Reminders</h3>
                        <p>Stay focused on writing your next entry with an idle timer that notifies you when it may be time for a break.</p>
                    </li>
                    <li>
                        <FaHandsHelping className="featureIcon" />
                        <h3>Foster Community</h3>
                        <p>We encourage all users to support each other by contributing writing prompts that everyone has access to.</p>
                    </li>
                    <li>
                        <FaWalking className="featureIcon" />
                        <h3>Take a Break</h3>
                        <p>Registered users have the ability to save as many in-progress journal entries to our database as they desire.</p>
                    </li>
                    <li>
                        <FaFileDownload className="featureIcon" />
                        <h3>Keep Your Work</h3>
                        <p>When you're ready to move on and export your journal entry registered users can download it as a PDF file.</p>
                    </li>
                    <li>
                        <FaSpotify className="featureIcon" />
                        <h3>Set the Mood</h3>
                        <p>Create the right atmosphere by listening to your favourite music while you journal thanks to our Spotify Integration.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;