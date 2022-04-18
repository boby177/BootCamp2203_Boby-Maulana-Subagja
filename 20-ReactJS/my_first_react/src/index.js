import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

const element = (
<div class="body">
<ul class='nav'>
    <a href="#"><li>home</li></a>  
    <a href="#"><li>about</li></a>  
    <a href="#"><li>contact</li></a> 
</ul>

<div class="text">
<h2> BOOTCAMP BATCH 1 : Experiment with REACTJS</h2>
<h1>This is React</h1>
</div>

</div>
);

ReactDOM.render(element,document.getElementById("root"))