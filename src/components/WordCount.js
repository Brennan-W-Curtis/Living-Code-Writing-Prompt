const WordCount = ({ userInput }) => {

    const determineCount = string => {
        // Split the user's input by all non-alphanumeric characters based on the regular expression delimiter into an array of words.
        const allWords = string.split(/\W+/);

        // Create an empty object to store all words along with their number of occurences.
        const wordCount = {};

        // Iterate through the length of the array.
        for (let i = 0; i < allWords.length; i++) {

            // Temporarily store the current word in a variable after changing all it's characters to lower case.
            const currentWord = allWords[i].toLowerCase();

            // Assess whether the current word is an alphabet character should it satisfy this condition it wil be added to the object.
            if (!/\d+/.test(currentWord)) {

                // If the word is not present within the object create a new property otherwise increment the current value.
                if (wordCount[currentWord] === undefined) {
                    wordCount[currentWord] = 1;
                } else {
                    wordCount[currentWord] = wordCount[currentWord] + 1;
                }

            }

        }

        // Delete all instances of empty strings within the word count object.
        delete wordCount[""];

        // Create an empty array to store all the occurences of words.
        const countArray = []

        // Iterate through the object and insert each property's value into the array.
        for (let word in wordCount) {
            countArray.push(wordCount[word]);
        }

        // Declare a reducer function that will produce a sum of all the values in the array.
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        // Return the number of words that occur within the user's input.
        return countArray.length > 0 ? countArray.reduce(reducer) : null
    }

    return (
        <div className="wordCount">
            {
                // Conditionally render the word count depending on the user's input.
                userInput !== "" ?
                    <p>
                        {determineCount(userInput)} {
                            determineCount(userInput) === null ?
                                null:
                                determineCount(userInput) === 1 ? 
                                    "word": 
                                    "words"
                        }
                    </p> :
                    null
            }
        </div>
    )
}

export default WordCount;