import jokesData from '../data/jokesData';

function Joke(props) {
    return (
        <>
            {props.setup && <p className='setup'>Setup: {props.setup}</p>}
            <p className='punchline'>Punchline: {props.punchline}</p>
            <hr />
        </>
    );
}

/**
 * Challenge: See if you can correctly pass the necessary props to the
 * Joke component in the .map() (and render the jokeElements array) so
 * the jokes show up on the page again
 */

export default function MapComp() {
    const jokeElements = jokesData.map((joke) => {
        return <Joke setup={joke.setup} punchline={joke.punchline} />;
    });
    return <main>{jokeElements}</main>;
}

// <Joke
//     punchline="It's hard to explain puns to kleptomaniacs because they always take things literally."
// />
// <Joke
//     setup="How did the hacker escape the police?"
//     punchline="He just ransomware!"
// />
// <Joke
//     setup="Why don't pirates travel on mountain roads?"
//     punchline="Scurvy."
// />
// <Joke
//     setup="Why do bees stay in the hive in the winter?"
//     punchline="Swarm."
// />
// <Joke
//     setup="What's the best thing about Switzerland?"
//     punchline="I don't know, but the flag is a big plus!"
// />
