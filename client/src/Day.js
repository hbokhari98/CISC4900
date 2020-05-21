import React from 'react';
import "./index.css"
const Day = props => {
    return(
        <td onClick={() => props.switchView(props.day)} className="Day">
            <div className="text-center">
                {props.day !== 0 ? props.day : ''}
            </div>
            <div className="text-center appt">
                {props.numberOfAppointments}
            </div>
        </td>
    )
}

export default Day;