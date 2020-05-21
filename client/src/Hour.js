import React, { useState } from 'react';
import AddAppointment from './AddAppointment';
import "./index.css"

const Hour = props => {
    const [appointmentShow, setAppointmentShow] = useState(false);
    const [mouseHovered, setMouseHovered] = useState(false);
    const style = {
        backgroundColor: '#c0b7e6',
    };
    const hovered = {
        cursor: 'url("/assets/dogCursor.png"),pointer',
    }
    const time = `${props.hour%12===0?'12':props.hour%12}${props.hour/12 >= 1 ? 'pm' : 'am'}`;
    const selectedPet = () => {
        const { selectedPet, pets } = props;
        if(selectedPet === null) return '';
        for(let i=0;i<pets.length;i++){
            if(pets[i].id === parseInt(selectedPet)) return pets[i].name;
        }
        return '';
    }
    return (
        <tr 
            onClick={() => setAppointmentShow(true)}
            onMouseOver={() => setMouseHovered(true)}
            onMouseLeave={() => setMouseHovered(false)}
            style=
            {props.task ? 
                mouseHovered ? 
                {...style,...hovered} : {...style} :
                {}
            }
        >
            <td colSpan="2" className="dayView">
                {time}
            </td>
            <td colSpan="1">
                {selectedPet()}
            </td>
            <td colSpan="10">{props.task}
                <AddAppointment 
                    show={appointmentShow}
                    onHide={() => setAppointmentShow(false)}
                    task={props.task}
                    hour={props.hour}
                    day={props.day}
                    month={props.month}
                    year={props.year}
                    pets={props.pets}
                    submit={props.onSubmit}
                />
            </td>
        </tr>
    )
}

export default Hour;