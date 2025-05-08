export default function Map() {
    /* 
    Recap 

    The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.

    const array1 = [1, 4, 9, 16];

    Pass a function to map
    const map1 = array1.map((x) => x * 2);

    console.log(map1);
    Expected output: Array [2, 8, 18, 32]
    */

    /*
    Challenge 1:
    Given an array of numbers, return an array of each number, squared
    */

    const nums = [1, 2, 3, 4, 5];

    // -->       [1, 4, 9, 16, 25]
    // Your code here

    const map1 = nums.map((element) => element * element);
    console.log(map1);

    /*
    Challenge 2:
    Given an array of strings, return an array where 
    the first letter of each string is capitalized
    */

    const names = ['alice', 'bob', 'charlie', 'danielle'];
    // -->        ["Alice", "Bob", "Charlie", "Danielle"]
    // Your code here

    const map2 = names.map(
        (element) => element[0].toUpperCase() + element.slice(1)
    );
    console.log(map2);

    /*
    Challenge 3:
    Given an array of strings, return an array of strings that wraps each
    of the original strings in an HTML-like <p></p> tag.

    E.g. given: ["Bulbasaur", "Charmander", "Squirtle"]
    return: ["<p>Bulbasaur</p>", "<p>Charmander</p>", "<p>Squirtle</p>"]
    */

    const pokemon = ['Bulbasaur', 'Charmander', 'Squirtle'];
    // -->          ["<p>Bulbasaur</p>", "<p>Charmander</p>", "<p>Squirtle</p>"]
    // Your code here
    const map3 = pokemon.map((element) => `<p>${element}</p>`);
    console.log(map3);
}
