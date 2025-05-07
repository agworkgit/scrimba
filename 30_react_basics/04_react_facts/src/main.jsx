import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')).render(
    <main>
        <svg
            width='30%'
            height='30%'
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

        <h1>Fun facts about React</h1>

        <ul>
            <li>Was first released in 2013</li>
            <li>Was originally created by Jordan Walke</li>
            <li>Has well over 100K stars on GitHub</li>
            <li>Is maintained by Meta</li>
            <li>Powers thousands of enterprise apps, including mobile apps</li>
        </ul>
    </main>
);
