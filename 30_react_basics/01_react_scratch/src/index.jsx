import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
    <ul>
        <h2>Why I like React:</h2>
        <li>Super popular JS library</li>
        <li>Increase developer employability</li>
        <li>
            React is used by some of largest applications in the world, such as
            Facebook and Instagram
        </li>
    </ul>
);
