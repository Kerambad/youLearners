import React, { useState } from 'react'
import { Mark } from '../models/Mark'

type EditMarkProps = {
    isActive: boolean
    exsistingMark: Mark
    setIsActive: (newState: boolean) => void
    editMark: (markId: string, markToEdit: Mark) => void
}

export default function EditMark(props: EditMarkProps) {

    const [isSection, setIsSection] = useState(false)

    const emptyFormPlaceholder: Mark = props.exsistingMark

    const [formValues, setFormValues] = useState(emptyFormPlaceholder)

    function handleFormInput(action: React.ChangeEvent<HTMLInputElement>) {
        setFormValues((old) => ({ ...old, [action.target.name]: action.target.value }))
    }

    function handleFormSubmit(action: React.FormEvent<HTMLFormElement>) {
        action.preventDefault()
        let newMarkToSend = formValues;
        if (newMarkToSend.endTime === 0) {
            newMarkToSend.endTime = undefined;
        }
        props.exsistingMark.bookmarkId && props.editMark(props.exsistingMark.bookmarkId, newMarkToSend)
        props.setIsActive(false)
    }


    if (!props.isActive) return null
    return (
        <div>
            <form onSubmit={(action) => handleFormSubmit(action)}>
                <input type="radio" className="btn-check" name="options" id="option1" autoComplete='off' checked={!isSection} onClick={() => setIsSection(false)} readOnly />
                <label className="btn btn-light w-50" htmlFor="option1" >Bookmark</label>

                <input type="radio" className="btn-check" name="options" id="option2" autoComplete='off' checked={isSection} onClick={() => setIsSection(true)} readOnly />
                <label className="btn btn-light w-50" htmlFor="option2" >Section</label>
                <div className='form-floating my-1' >
                    <input
                        className={"form-control my-2 w-100"}
                        id='idInsert'
                        type={"text"}
                        placeholder="Name"
                        name='name'
                        value={formValues.name}
                        onChange={(action) => handleFormInput(action)}
                        required={true}
                    />
                    <label htmlFor='idInsert'>Name</label>
                </div>
                <div className='form-floating my-1' >
                    <input
                        className={"form-control my-2 w-100"}
                        id='idInsert'
                        type={"number"}
                        placeholder="Start-Time"
                        value={formValues.time}
                        name="time"
                        onChange={(action) => handleFormInput(action)}
                        required={true}
                    />
                    <label htmlFor='idInsert'>Start-Time</label>
                </div>
                <div className='form-floating my-1' >
                    <input
                        className={"form-control my-2 w-100"}
                        id='idInsert'
                        type={"text"}
                        placeholder="End-Time"
                        value={formValues.endTime}
                        name="endTime"
                        onChange={(action) => handleFormInput(action)}
                        disabled={!isSection}
                    />
                    <label htmlFor='idInsert'>End-Time</label>
                </div>
                <button className='btn btn-danger w-50' type='submit'>Edit Mark</button>
                <button className='btn btn-light w-50' onClick={() => props.setIsActive(false)}>Back</button>
            </form>
        </div>
    )
}
