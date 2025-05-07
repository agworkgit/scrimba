import { createRoot } from 'react-dom/client';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(<Page />);

function Header() {
    return (
        <header className='header'>
            <svg
                width='5%'
                height='5%'
                viewBox='-10.5 -9.45 21 18.9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle cx='0' cy='0' r='2' fill='rgb(88, 196, 220)'></circle>
                <g stroke='rgb(88, 196, 220)' stroke-width='1' fill='none'>
                    <ellipse rx='10' ry='4.5'></ellipse>
                    <ellipse rx='10' ry='4.5' transform='rotate(60)'></ellipse>
                    <ellipse rx='10' ry='4.5' transform='rotate(120)'></ellipse>
                </g>
            </svg>

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

function MainContent() {
    return (
        <main className='main-content'>
            <h1>Reasons I'm excited to learn React</h1>
            <ol>
                <li>It has a large community</li>
                <li>It is regularly maintained and updated</li>
                <li>It increases employability</li>
                <li>It is adpots a declarative way of writing code</li>
                <li>It can be used for both web and native development</li>
                <li>
                    It is composable and can make a larger project easy to work
                    on
                </li>
            </ol>
        </main>
    );
}

function Footer() {
    return (
        <footer className='footer'>
            © 2025 Alex Grigore development. All rights reserved.
        </footer>
    );
}

export function Page() {
    return (
        <>
            <Header />
            <MainContent />
            <Footer />
        </>
    );
}
