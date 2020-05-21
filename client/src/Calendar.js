import React, { useState, useEffect } from 'react';
import Day from './Day';
import Hour from './Hour';
import SwitchMonths from './SwitchMonths';
import "./index.css";
import cogoToast from 'cogo-toast';

const Calendar = props => {
    const [currentDay, setCurrentDay] = useState(-1);
    const [makeMonthView, setMakeMonthView] = useState(true);
    const [apptData, setApptData] = useState([]);
    const [pets, setPets] = useState([]);
    // Used to called useEffect, everytime didDataUpdate changes, it will call useEffect
    const [didApptDataUpdate, setDidApptDataUpdate] = useState(0);
    const [didPetDataUpdate, setDidPetDataUpdate] = useState(0);
    

    useEffect(() => {
        let url = '/api/users/';
        let userId = '1';
        let backendCall = '/appts';
        fetch(url + userId + backendCall)
        .then(res => res.json())
        .then(res => {
            setApptData(res);
        })
    },[didApptDataUpdate])

    useEffect(() => {
        let url = '/api/users/';
        let userId = '1';
        let backendCall = '/pets';
        fetch(url + userId + backendCall)
            .then(res => res.json())
            .then(res => {
                console.log('pets data', res);
                setPets(res);
            })
    }, [didPetDataUpdate])

    const changeView = day => {
        setMakeMonthView(!makeMonthView);
        setCurrentDay(day);
    }

    const handleSubmit = (json, petName) => {
        let url = "/api/appts";
        fetch(url, {
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(json),
        })
        .then(res => {
            if(res.ok) {
                cogoToast.success(`Appointment created for ${petName}!`);
            }

            let update = didApptDataUpdate + 1;
            setDidApptDataUpdate(update);
        })
        // .then(res => res.json())
        // .then(data => console.log('data',data));
        // .then(res => {
        //     console.log('response ok?',res.clone().ok)
        //     console.log('response body',res.clone().body)
        //     console.log('response text',res.clone().text())
        //     console.log('response json',res.clone().json())
        //     console.log('response blob',res.clone().blob())
        //     console.log('response form data',res.clone().formData())
            // return res.json()
        // })
        // .then(data =>{
        //     console.log("data",data);
        //     let newData = this.state.data;
        //     newData.push(data);
        //     console.log("newData",newData);
        //     this.setState({data: newData});
        // })        
        .catch(err => console.log(err))
        // let newData = data;
        // newData.push(json);
        // setData(newData, () => console.log(newData));
        
    }

    const makeDays = (month, year) => {
        let firstDay = new Date(year, month).getDay();
        let daysInMonth = 32 - new Date(year,month,32).getDate();
        let Days = 1;
        let dayObjs = [];
        for(let i=0;i<5;i++){
            let weekObjs = [];
            for(let j=0;j<7;j++){
                if((i === 0 && j < firstDay) || Days > daysInMonth){
                    weekObjs.push(<Day 
                                    key={i*j + j} 
                                    day={0}
                                    switchView={(input) => console.log('Does nothing for now')}
                                    numberOfAppointments={''}
                                />);
                }
                else{
                    let numAppts = 0;
                    if(apptData.length !== 0){
                        for(let i=0;i<apptData.length;i++){
                            const { apptTime } = apptData[i];
                            let apptDate = new Date(apptTime);
                            let dayDate = new Date(year, month, Days);
                            if( dayDate.getFullYear() === apptDate.getFullYear() &&
                                dayDate.getMonth() === apptDate.getMonth() &&
                                dayDate.getDate() === apptDate.getDate())
                                ++numAppts;
                        }
                    }                    
                    weekObjs.push(<Day 
                                    day={Days} 
                                    key={i*j + j}
                                    switchView={changeView}
                                    numberOfAppointments={numAppts === 0 ? '' : numAppts === 1 ? `1 appointment` : `${numAppts} appointments`}
                                />);
                    Days++;
                }
            }
            dayObjs.push(<tr key={"tr" + i}>{weekObjs}</tr>)
        }
        const monthView = (
            <React.Fragment>
            <div className="card">
                <h3 className="card-header text-center">{props.monthAsString},{props.year}</h3>
                <table className="table table-bordered twidth">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tues</th>                        
                            <th>Wed</th>
                            <th>Thurs</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody id="calendar-body" className="theight twidth">
                        {dayObjs}
                    </tbody>
                </table>
                <SwitchMonths
                    switchMonths={props.onSwitch}
                />
            </div>
            </React.Fragment>
        );
        return monthView;
    }

    const makeHours = (givenDay, givenMonth, givenYear) => {
        let hourObjs = [];
        if(apptData.length !== 0){
            for(let i=0;i<24;i++){
                let date = new Date(givenYear,givenMonth,givenDay,i);
                let found = false;
                apptData.map(obj => {
                    const { apptTime, petId } = obj;
                    if(date.toISOString() === apptTime){
                        if(found){
                            hourObjs.pop();
                            hourObjs.push(
                                <Hour
                                    key={i}
                                    hour={i}
                                    day={givenDay}
                                    month={givenMonth}
                                    year={givenYear}
                                    task={obj.task}
                                    onSubmit={handleSubmit}
                                    selectedPet={petId}
                                    pets={pets}
                                />
                            )
                        }
                        if(!found){
                        hourObjs.push(
                            <Hour
                                key={i}
                                hour={i}
                                day={givenDay}
                                month={givenMonth}
                                year={givenYear}
                                task={obj.task}
                                onSubmit={handleSubmit}
                                selectedPet={petId}
                                pets={pets}
                            />
                        )
                        found = true;
                        }
                    }
                })
                if(!found){
                    hourObjs.push(
                        <Hour
                            key={i} 
                            hour={i}
                            day={givenDay}
                            month={givenMonth}
                            year={givenYear}
                            task = {""}
                            onSubmit={handleSubmit}
                            selectedPet={null}
                            pets={pets}
                        />
                    );
                }
            }
        }else{
            for(let i=0;i<24;i++){
                hourObjs.push(
                    <Hour
                        key={i} 
                        hour={i}
                        day={givenDay}
                        month={givenMonth}
                        year={givenYear}
                        task = {""}
                        onSubmit={handleSubmit}
                        selectedPet={null}
                        pets={pets}
                    />
                );
            }
        }
        const dayView = (
            <React.Fragment>
                <div className="container-fluid daypage">
                  <div className="row justify-content-center">
                    <div className="col-10 col-md-8 col-lg-7">
                      <div className="card mb-4">
                        <h3 className="card-header text-center dayView" onClick={() => changeView(-1)}>{props.monthAsString} {givenDay}</h3>
                        <table className="table table-borderless table-hover">
                            <tbody>
                                {hourObjs}
                            </tbody>
                        </table>
                    </div> 
                  </div>      
                </div>
              </div>              
            </React.Fragment>
        );
        return dayView;        
    }

    const updateCalendar = () => {
        const monthView = makeDays(props.monthAsNumber, props.year);
        const dayView = makeHours(currentDay, props.monthAsNumber, props.year);
        return makeMonthView ? monthView : dayView;
    }

    return (
        <div>
            <h1>Calendar</h1>
            {updateCalendar()}
        </div>
    );
}
export default Calendar;