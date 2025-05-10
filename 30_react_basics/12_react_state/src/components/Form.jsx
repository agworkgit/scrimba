// Imports

import React from 'react';

// Form Component

export default function Form() {
    // Ingredients State

    const [ingredients, setIngredients] = React.useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get('ingredient');

        setIngredients((prevIngredients) => [
            ...prevIngredients,
            newIngredient,
        ]);

        // Clear input, done with JS, what is the React equivalent?
        document.querySelector('.search-input').value = '';
    }

    const ingredientsListItems = ingredients.map((ingredient) => (
        <li className='ingredients-item' key={ingredient}>
            {ingredient}
        </li>
    ));

    return (
        <>
            <form onSubmit={handleSubmit} className='ingredient-form'>
                <input
                    className='search-input'
                    type='text'
                    name='ingredient'
                    aria-label='Add ingredient'
                    placeholder='e.g. oregano'
                ></input>
                <button className='submit-button'>Add Ingredient</button>
            </form>
            <ul className='ingredients-list'>
                <span className='ingredients-title'>Ingredients:</span>
                {ingredientsListItems}
            </ul>
        </>
    );
}
