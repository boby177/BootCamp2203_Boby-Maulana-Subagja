import React from 'react';

const nav = () => {
    return (
        <ul class='nav'>
            <a href="./mainContent.js"><li>home</li></a>
            <a href="./mainContent.js"><li>about</li></a>
            <a href="./mainContent.js"><li>contact</li></a>
            <li> <b>{new Date().toLocaleTimeString()}</b> </li>
        </ul>
    )
}

export default nav