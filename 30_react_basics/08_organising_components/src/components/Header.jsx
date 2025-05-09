export default function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <svg
                    className='icon'
                    width='100%'
                    height='100%'
                    viewBox='-10.5 -9.45 21 18.9'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='0'
                        cy='0'
                        r='2'
                        fill='rgb(88, 196, 220)'
                    ></circle>
                    <g stroke='rgb(88, 196, 220)' stroke-width='1' fill='none'>
                        <ellipse rx='10' ry='4.5'></ellipse>
                        <ellipse
                            rx='10'
                            ry='4.5'
                            transform='rotate(60)'
                        ></ellipse>
                        <ellipse
                            rx='10'
                            ry='4.5'
                            transform='rotate(120)'
                        ></ellipse>
                    </g>
                </svg>

                <span>ReactFacts</span>
            </div>

            <nav>
                <ul className='menu-list'>
                    <li>Pricing</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    );
}
