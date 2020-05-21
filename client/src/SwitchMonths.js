import React from 'react';
import "./index.css"
const SwitchMonths = props => {
    return(
        <span>
            <button className="btn btn-primary" onClick={() => props.switchMonths(-1)}>
                Previous
            </button>
            <button className="btn btn-secondary" onClick={() => props.switchMonths(1)}>
                Next
            </button>
        </span>        
    )
}
 
export default SwitchMonths;