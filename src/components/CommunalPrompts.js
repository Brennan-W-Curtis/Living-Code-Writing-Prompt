import { useEffect, useState } from 'react';
import realtime from '../firebase';
import { ref, onValue } from 'firebase/database';

const CommunalPrompts = () => {

    const [ currentPrompt, setCurrentPrompt ] = useState("");
    const [ storedPrompts, setStoredPrompts ] = useState([]);

    useEffect(() => {

        const dbRef = ref(realtime);

        onValue(dbRef, snapshot => {

            const myData = snapshot.val();
            const databasePrompts = [];

            for (let value in myData) {
                databasePrompts.push(myData[value]);
            }

            setStoredPrompts(databasePrompts);

            const selectPrompt = () => {
                const randomIndex = Math.floor(Math.random() * storedPrompts.length);
                setCurrentPrompt(storedPrompts[randomIndex]);

            }
            
            selectPrompt();

        })

    }, [currentPrompt])

    return (
        <div>
            <p></p>
        </div>
    )
}

export default CommunalPrompts;