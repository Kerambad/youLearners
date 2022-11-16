import { useEffect, useState } from 'react'
import { Mark } from '../models/Mark'
import "./InputTime.css"

type InputTimeProps = {
    timeInSeconds: number
    setTimeInSeconds: React.Dispatch<React.SetStateAction<Mark>>
    isNotActive: boolean
    attribute: string
}

export default function InputTime(props: InputTimeProps) {

    const [valueDays, setValueDays] = useState(Math.floor(props.timeInSeconds / 86400))
    const [valueHours, setValueHours] = useState(Math.floor((props.timeInSeconds % 86400) / 3600))
    const [valueMinutes, setValueMinutes] = useState(Math.floor((props.timeInSeconds % 3600) / 60))
    const [valueSeconds, setValueSecondes] = useState(Math.floor(props.timeInSeconds % 60))

    // days: Math.floor(props.timeInSeconds / 86400),
    // hours: Math.floor((props.timeInSeconds % 86400) / 3600),
    // minutes: Math.floor((props.timeInSeconds % 3600) / 60),
    // seconds: Math.floor(props.timeInSeconds % 60)

    const setTimeInAddComponent = props.setTimeInSeconds
    const attribute = props.attribute

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
        setTimeInAddComponent((old) => ({ ...old, [attribute]: tempTime }))

    }, [valueDays, valueHours, valueMinutes, valueSeconds, setTimeInAddComponent, attribute])

    return (
        <p className='input-field'>
            <input
                disabled={props.isNotActive}
                className='col-2 p-2 time-field'
                type={"number"}
                name='days'
                value={Math.floor(props.timeInSeconds / 86400)}
                onChange={(action) => onDaysChange(action)}
                style={{
                    "borderLeft": "0.5px solid",
                    "borderTopLeftRadius": "0.375rem",
                    "borderBottomLeftRadius": "0.375rem",
                }}
            />
            <input
                disabled={props.isNotActive}
                className='col-2 time-field'
                name='hours'
                type={"number"}
                value={Math.floor((props.timeInSeconds % 86400) / 3600)}
                onChange={(action) => onHourChange(action)}
            />
            <input
                disabled={props.isNotActive}
                className='col-2 time-field' 
                name='minutes'
                type={"number"}
                value={Math.floor((props.timeInSeconds % 3600) / 60)}
                onChange={(action) => onMinuteChange(action)}
            />
            <input
                disabled={props.isNotActive}
                className='col-2 time-field'
                name='seconds'
                type={"number"}
                value={props.timeInSeconds % 60}
                onChange={(action) => onSecondsChange(action)}
                style={{
                    "borderRight": "0.5px solid",
                    "borderTopRightRadius": "0.375rem",
                    "borderBottomRightRadius": "0.375rem",
                }}
            />
        </p>
    )

}
