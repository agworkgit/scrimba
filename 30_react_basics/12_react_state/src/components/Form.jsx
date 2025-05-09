// Current Component

export default function Form() {
    return (
        <form className='ingredient-form'>
            <input
                className='search-input'
                type='text'
                aria-label='Add ingredient'
                placeholder='e.g. oregano'
            ></input>
            <button className='submit-button'>Add Ingredient</button>
        </form>
    );
}
