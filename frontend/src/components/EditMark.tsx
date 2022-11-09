import React, { useState } from 'react'
import { Mark } from '../models/Mark'

type EditMarkProps = {
    isActive: boolean
    exsistingMark: Mark
    setIsActive: (newState: boolean) => void
    editMark: (markId: string, markToEdit: Mark) => void
    errorMessages: string[]
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
    player: any
}

export default function EditMark(props: EditMarkProps) {

    const [isSection, setIsSection] = useState<boolean>(() => {
        return !!props.exsistingMark.sectionId;
    })

    const emptyFormPlaceholder: Mark = props.exsistingMark

    const [formValues, setFormValues] = useState(emptyFormPlaceholder)

    function handleFormInput(action: React.ChangeEvent<HTMLInputElement>) {
        setFormValues((old) => ({ ...old, [action.target.name]: action.target.value }))
    }

    function handleFormSubmit(action: React.FormEvent<HTMLFormElement>) {
        let nameisPresent = false
        if (formValues.name.length) nameisPresent = true
        props.setErrorMessages([])
        action.preventDefault()
        prepareValuesForSubmit()
        if (!props.errorMessages.length && nameisPresent) {
            console.log(formValues.name.length);
            props.exsistingMark.bookmarkId && props.editMark(props.exsistingMark.bookmarkId, formValues)
            props.exsistingMark.sectionId && props.editMark(props.exsistingMark.sectionId, formValues)

            if (!props.errorMessages.length && nameisPresent) {
                setFormValues(emptyFormPlaceholder)
                props.setIsActive(false)
            }
        }
    }
    function prepareValuesForSubmit() {
        if (!isSection) setFormValues((old) => ({ ...old, endTime: undefined }))
        try {
            handleFormExceptions(props.player.getDuration())
          } catch (TypeError) {
            console.log("If errors occuring load video before editing.");
            
          }
    }

    function handleFormExceptions(videoEndTime: number) {
        if (videoEndTime < formValues.time) {
            props.setErrorMessages((old) => old.concat(["Start-time must be in Video-length"]))
            console.log("time to long");

        }
        if (!formValues.name.length) {
            props.setErrorMessages((old) => old.concat(["Name can't be empty"]))
            console.log("name");
        }
        if (formValues.time < 0) {
            props.setErrorMessages((old) => old.concat(["Time can't be lower then 0"]))
        }
        if (formValues.endTime) {
            if ((videoEndTime < formValues.endTime)) {
                props.setErrorMessages((old) => old.concat(["End time must be in Video-length"]))
            }
            if ((formValues.time > formValues.endTime)) {
                props.setErrorMessages((old) => old.concat(["Time must be lower then Endtime"]))
            }
        }
    }
    function displayErrors() {
        if (!props.errorMessages.length) return null
        return (
            <div className="alert alert-danger" role="alert">
                {props.errorMessages.map((errorMessage, key) => <p key={key}>{errorMessage}</p>)}
            </div>

        )
    }
function closeComponent() {
    props.setIsActive(false)
    props.setErrorMessages([])
  }
    if (!props.isActive) return null
    return (
        <div>
            <form onSubmit={(action) => handleFormSubmit(action)}>
                <input type="radio" className="btn-check" name="bookmark" id="bookmark" autoComplete='off' checked={!isSection} onClick={() => setIsSection(false)} readOnly />
                <label className="btn btn-light w-50" htmlFor="bookmark" >Bookmark</label>

                <input type="radio" className="btn-check" name="section" id="section" autoComplete='off' checked={isSection} onClick={() => setIsSection(true)} readOnly />
                <label className="btn btn-light w-50" htmlFor="section" >Section</label>
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
                {displayErrors()}
                <button className='btn btn-danger w-50' type='submit'>Edit Mark</button>
                <button className='btn btn-light w-50' onClick={() => closeComponent()}>Back</button>
            </form>
        </div>
    )
}
