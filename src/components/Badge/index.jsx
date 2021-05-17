import React from 'react'
import './Badge.scss';
import  classNames  from 'classnames';

function Badge({color, setColor, className}) {
    return (
        
            <i onClick={setColor} className={classNames('badge', { [`badge--${color}`]: color }, className)}></i>
        
    )
}

export default Badge
