import React from 'react';
import './FillBackgroundButton.css';

function FillBackgroundButton(props) {
    const { content, text_color, background_color, action } = props;

    return (
        <>
            <button
                onClick={action}  
                style={{
                    backgroundColor: background_color, 
                    color: text_color 
                }}
                className="boton-elegante"  
            >
                {content}
            </button>
        </>
    );
}

export default FillBackgroundButton
