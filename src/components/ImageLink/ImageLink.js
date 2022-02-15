import React from 'react';
import './ImageLink.css'

const ImageLink = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>

           <p className = 'f3'>
               {'This smart application will detect faces in your pictures.'}
           </p>
           <p className = 'f3'>
               {'Paste an image link below.'}
           </p>
           <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} autoFocus />
                    <button className ='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
            
        </div>
    )
}

export default ImageLink;