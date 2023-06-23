import React from 'react';
import clouds from '../images/clouds.png';

function Footer () {
    return(
        <div>
           <img className="h-64 bottom-0 w-screen flex" src={clouds} alt="clouds"/>
        </div>    
    );
}

export default Footer;