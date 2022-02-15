import React from 'react';
import Tilt from 'react-parallax-tilt';
import name from './name.png';



const Logo = () => {
    return (
        <div className ='ma4 mt0'>
            <Tilt className="tilt-img br2 shadow-2">
                
                <div style={{width: 200, }}>
                    <img alt='logo' src={name}/>
                 </div>
                
            </Tilt>
            
        </div>
    )
}

export default Logo;