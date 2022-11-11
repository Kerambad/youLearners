import { useState } from 'react'
import { Mark } from '../models/Mark'

type InputTimeProps = {
    timeInSeconds: number
    setTimeInSeconds: React.Dispatch<React.SetStateAction<Mark>>
}

export default function InputTime(props: InputTimeProps) {
    const [inputValue, setInputValue] = useState({
        days: Math.floor(props.timeInSeconds / 86400),
        hours: Math.floor((props.timeInSeconds % 86400) / 3600),
        minutes: Math.floor((props.timeInSeconds % 3600) / 60),
        seconds: Math.floor(props.timeInSeconds % 60)
    })
    
    const timeInputInitial = {
        days: Math.floor(props.timeInSeconds / 86400),
        hours: Math.floor((props.timeInSeconds % 86400) / 3600),
        minutes: Math.floor((props.timeInSeconds % 3600) / 60),
        seconds: Math.floor(props.timeInSeconds % 60)
    }
    let timeInput = timeInputInitial

    function handleInputChange(action: React.ChangeEvent<HTMLInputElement>) {

        // setInputValue((old) => ({ ...old, [action.target.name]: action.target.value }))
        // console.log("Sec: "+inputValue.seconds);
        // console.log("min: "+inputValue.minutes);
        // console.log("hour: "+inputValue.hours);
        // console.log(inputValue);
        

        // let timeInput = {
        //     days: Math.floor(props.timeInSeconds / 86400),
        //     hours: Math.floor((props.timeInSeconds % 86400) / 3600),
        //     minutes: Math.floor((props.timeInSeconds % 3600) / 60),
        //     seconds: Math.floor(props.timeInSeconds % 60)
        // }

        timeInput = (({ ...timeInput, [action.target.name]: action.target.value }))
        // console.log(timeInput.seconds);

        console.log("Testday:" + timeInput.days);
        console.log("Testhur:" + timeInput.hours);
        console.log("Testmin:" + timeInput.minutes)
        console.log("Testsec:" + timeInput.seconds);
    

        // if (timeInput.hours > 23) {
        //     setTimeInput((time) => ({ ...time, hours: 23 }))
        // }
        // if (timeInput.minutes > 59) {
        //     setTimeInput((time) => ({ ...time, minutes: 59 }))
        // }
        // if (timeInput.seconds > 59) {
        //     setTimeInput((time) => ({ ...time, seconds: 59 }))
        // }

        let tempTime = (timeInput.minutes * 60) +
            (timeInput.hours * 3600) +
            (timeInput.days * 86400) +
            (timeInput.seconds);

        // console.log(tempTime);


        props.setTimeInSeconds((old) => ({
            ...old, time: tempTime
        }))
    }

    // let testtime = 90061
    // let testday = Math.floor(testtime / 86400)
    // let testhour = Math.floor((testtime % 86400) / 3600)
    // let testmin = Math.floor((testtime % 3600) / 60)
    // let testsec = Math.floor(testtime % 60)

    // console.log("Testday:" + testday);
    // console.log("Testhur:" + testhour);
    // console.log("Testmin:" + testmin)
    // console.log("Testsec:" + testsec);

    // return (
    //     <p className='row mx-2'>
    //         <input className='col-2 p-2 border-1' type={"number"} min={0} name='days' value={Math.floor(props.timeInSeconds / 86400)} onChange={(action) => handleInputChange(action)}></input>
    //         <input className='col-2' name='hours' type={"number"} min={0} max={59} value={Math.floor((props.timeInSeconds % 86400) / 3600)} onChange={(action) => handleInputChange(action)}></input>
    //         <input className='col-2' name='minutes' type={"number"} min={0} max={59} value={Math.floor((props.timeInSeconds % 3600) / 60)} onChange={(action) => handleInputChange(action)}></input>
    //         <input className='col-2' name='seconds' type={"number"} min={0} max={59} value={Math.floor(props.timeInSeconds % 60)} onChange={(action) => handleInputChange(action)}></input>
    //     </p>
    // )
    return (
        <p className='row mx-2'>
            <input className='col-2 p-2 border-1' type={"number"}  name='days' value={timeInput.days} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='hours' type={"number"}  value={timeInput.hours} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='minutes' type={"number"} value={timeInput.minutes} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='seconds' type={"number"} value={timeInput.seconds} onChange={(action) => handleInputChange(action)}></input>
        </p>
    )

}
