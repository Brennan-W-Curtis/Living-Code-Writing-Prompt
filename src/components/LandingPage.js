import { FaUserClock, FaHandHoldingHeart, FaHandsHelping, FaWalking, FaFileDownload, FaSpotify } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div>
            <div className="productDescription">
                <h2>Your Time is Valuable</h2>
                <div className="descriptionContent">
                    <p>Modern word processors purposefully remove features to prevent distracting you from writing, we follow in this tradition because we value your time.</p>
                    <p>Plume is a simple text editor designed for writers to focus on writing their story by creating a constructive environment while also helping them set healthy boundaries.</p>
                </div>
            </div>
            <div className="productFeatures">
                <ul className="featuresList">
                    <li>
                        <FaUserClock className="featureIcon" />
                        <h3>Set and Forget</h3>
                        <p>Determine how long you would like to spend writing and we'll help you stay accountable to your schedule.</p>
                    </li>
                    <li>
                        <FaHandHoldingHeart className="featureIcon" />
                        <h3>Gentle Reminders</h3>
                        <p>Stay focused on creating your next piece with an idle timer that notifies you when it may be time for a break.</p>
                    </li>
                    <li>
                        <FaHandsHelping className="featureIcon" />
                        <h3>Foster Community</h3>
                        <p>We encourage users to support others by making writing prompts they contribute accessible to all.</p>
                    </li>
                    <li>
                        <FaWalking className="featureIcon" />
                        <h3>Take a Break</h3>
                        <p>Users that register have the ability to save as many in-progress articles to our database as they want.</p>
                    </li>
                    <li>
                        <FaFileDownload className="featureIcon" />
                        <h3>Keep Your Work</h3>
                        <p>When you're ready to move on and export your piece we'll prepare a download of the file in a PDF format.</p>
                    </li>
                    <li>
                        <FaSpotify className="featureIcon" />
                        <h3>Set the Mood</h3>
                        <p>Create the right atmosphere by listening to your music while you write through our Spotify Integration.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;