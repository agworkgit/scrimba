export default function Arrays() {
    /**
     * React can render arrays of JSX elements
     */

    /**
     * Challenge: manually turn this string array into an array of
     * JSX elements by surrounding each ninja turtle with an <h2> element
     */

    const ninjaTurtles = [
        <h2>Donatello</h2>,
        <h2>Michaelangelo</h2>,
        <h2>Rafael</h2>,
        <h2>Leonardo</h2>,
    ];

    console.log(ninjaTurtles);
    return <main>{ninjaTurtles}</main>;
}
