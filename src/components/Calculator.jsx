import React from 'react';
import './calculator.css';

export default function Calculator({ children }) {
    return (
        <div className='calculator'>{children}</div>
    )
}
