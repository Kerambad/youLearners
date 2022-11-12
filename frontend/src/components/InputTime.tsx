import { useEffect, useState } from 'react'
import { Mark } from '../models/Mark'

type InputTimeProps = {
    timeInSeconds: number
    setTimeInSeconds: React.Dispatch<React.SetStateAction<Mark>>
}

export default function InputTime(props: InputTimeProps) {

    const [valueSeconds, setValueSecondes] = useState(0)
    const [valueMinutes, setValueMinutes] = useState(0)
    const [valueHours, setValueHours] = useState(0)
    const [valueDays, setValueDays] = useState(0)

    const setTimeInAddComponent = props.setTimeInSeconds

    function onSecondsChange(action: React.ChangeEvent<HTMLInputElement>) {
        let changedTime: number = Number(action.target.value)
        if (changedTime < 60) {
            setValueSecondes(changedTime)
        }
        else if (changedTime < 0) {
            setValueSecondes(0)
        }
        else {
            changedTime = (changedTime - (changedTime % 10)) / 10
            setValueSecondes(changedTime)
        }
    }
    function onMinuteChange(action: React.ChangeEvent<HTMLInputElement>) {
        let changedTime: number = Number(action.target.value)
        if (changedTime < 60) {
            setValueMinutes(changedTime)
        }
        else if (changedTime < 0) {
            setValueMinutes(0)
        }
        else {
            changedTime = (changedTime - (changedTime % 10)) / 10
            setValueMinutes(changedTime)
        }
    }
    function onHourChange(action: React.ChangeEvent<HTMLInputElement>) {
        let changedTime: number = Number(action.target.value)
        if (changedTime < 24) {
            setValueHours(changedTime)
        }
        else if (changedTime < 0) {
            setValueHours(0)
        }
        else {
            changedTime = (changedTime - (changedTime % 10)) / 10
            setValueHours(changedTime)
        }
    }
    function onDaysChange(action: React.ChangeEvent<HTMLInputElement>) {
        let changedTime: number = Number(action.target.value)
        if (changedTime < 0) {
            setValueDays(0)
        }
        setValueDays(changedTime)
    }

    useEffect(() => {
        let tempTime = (valueMinutes * 60) +
            (valueHours * 3600) +
            (valueDays * 86400) +
            (valueSeconds);
        setTimeInAddComponent((old) => ({ ...old, time: tempTime }))

    }, [valueDays, valueHours, valueMinutes, valueSeconds, setTimeInAddComponent])

    return (
        <p className='row mx-2'>
            <input className='col-2 p-2 border-1' type={"number"} name='days' value={valueDays} onChange={(action) => onDaysChange(action)}></input>
            <input className='col-2' name='hours' type={"number"} value={valueHours} onChange={(action) => onHourChange(action)}></input>
            <input className='col-2' name='minutes' type={"number"} value={valueMinutes} onChange={(action) => onMinuteChange(action)}></input>
            <input className='col-2' name='seconds' type={"number"} value={valueSeconds} onChange={(action) => onSecondsChange(action)}></input>
        </p>
    )

}
