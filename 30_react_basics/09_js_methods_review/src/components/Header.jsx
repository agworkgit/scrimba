/**
 * Challenge:
 *
 * - Create an App component in a separate file.
 *   Import it here and render it
 * - Create a "components" folder and a Header component.
 *   Render the Header inside the App component.
 * - Follow the Travel Journal design to build the Header
 *   for our page.
 */

export default function Header() {
    return (
        <header>
            <nav>
                <img
                    src='./src/assets/earth.png'
                    alt='globe icon'
                    className='globe-icon'
                />
                <span className='nav-title'>my travel journal.</span>
            </nav>
        </header>
    );
}
