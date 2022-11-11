import { useState } from 'react'
import { Mark } from '../models/Mark'

type InputTimeProps = {
    timeInSeconds: number
    setTimeInSeconds: React.Dispatch<React.SetStateAction<Mark>>
}

export default function InputTime(props: InputTimeProps) {

    type inputTime = {
        days: number,
        hours: number,
        minutes: number,
        seconds: number
    }

    const [inputValue, setInputValue] = useState<inputTime>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    function handleInputChange(action: React.ChangeEvent<HTMLInputElement>) {

        setInputValue((old) => ({ ...old, [action.target.name]: action.target.value }))

        // console.log("Testday:" + inputValue.days);
        // console.log("Testhur:" + inputValue.hours);
        // console.log("Testmin:" + inputValue.minutes)
        // console.log("Testsec:" + inputValue.seconds);

        if (inputValue.hours > 23) {
            setInputValue((time) => ({ ...time, hours: 23 }))
        }
        if (inputValue.minutes > 59) {
            setInputValue((time) => ({ ...time, minutes: 59 }))
        }
        if (inputValue.seconds > 59) {
            setInputValue((time) => ({ ...time, seconds: 59 }))
        }

        let tempTime = (inputValue.minutes * 60) +
            (inputValue.hours * 3600) +
            (inputValue.days * 86400) +
            (inputValue.seconds);

        console.log(tempTime);

        props.setTimeInSeconds((old) => ({...old, time: tempTime}))
    }

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
            <input className='col-2 p-2 border-1' type={"number"} min={0} name='days' value={inputValue.days} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='hours' type={"number"} min={0} max={59} value={inputValue.hours} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='minutes' type={"number"} min={0} max={59} value={inputValue.minutes} onChange={(action) => handleInputChange(action)}></input>
            <input className='col-2' name='seconds' type={"number"} min={0} max={59} value={inputValue.seconds} onChange={(action) => handleInputChange(action)}></input>
        </p>
    )

}
