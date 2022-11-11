import React, { useState } from 'react'
import { CurrentVideoStats } from '../models/CurrentVideoStats'
import { Mark } from '../models/Mark'
import InputTime from './InputTime'
type CreateNewMarkProps = {
  setRenderAddComponent: (state: boolean) => void
  addNewMark: (newMark: Mark) => void
  currentVideoStats: CurrentVideoStats
  player: any
  setCloseAddComponent: React.Dispatch<React.SetStateAction<boolean>>
  errorMessages: string[]
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CreateNewMark(props: CreateNewMarkProps) {
  const [isSection, setIsSection] = useState(false)

  const emptyFormPlaceholder: Mark = {
    dedicatedVideoId: "",
    name: "",
    time: 0,
    endTime: undefined
  }

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
      props.addNewMark(formValues)
    }
    if (!props.errorMessages.length && nameisPresent) {
      setFormValues(emptyFormPlaceholder)
      props.setCloseAddComponent(false)
    }
  }

  function prepareValuesForSubmit() {
    formValues.dedicatedVideoId = props.currentVideoStats.videoId
    if (!isSection) setFormValues((old) => ({ ...old, endTime: undefined }))
    try {
      handleFormExceptions(props.player.getDuration())
    } catch (TypeError) {
      props.setErrorMessages((old) => old.concat(["You need to select a Video"]))
    }
  }

  function handleFormExceptions(videoEndTime: number) {
    if (videoEndTime < formValues.time) {
      props.setErrorMessages((old) => old.concat(["Start-time must be in Video-length"]))
    }
    if (!formValues.name.length) {
      props.setErrorMessages((old) => old.concat(["Name can't be empty"]))
    }
    if (formValues.time < 0) {
      props.setErrorMessages((old) => old.concat(["Time can't be lower then 0"]))
    }
    if (formValues.endTime) {
      if ((videoEndTime < formValues.endTime)) {
        props.setErrorMessages((old) => old.concat(["End time must be in Video-length"]))
      }
      if ((formValues.time > formValues.endTime)) {
        props.setErrorMessages((old) => old.concat(["End-time can't be lower then Start-time"]))
      }
    }
  }
  function displayErrors() {
    if (!props.errorMessages.length) return null
    return (
      <div className="alert alert-danger" role="alert">
        {props.errorMessages.map((errorMessage, key) => <li className='m-0' key={key}>{errorMessage}</li>)}
      </div>

    )
  }
  function handleSetCurrentTime(name: string) {
    if (props.player) {
      let elapsedTime: number = props.player.getCurrentTime()
      elapsedTime = Math.round(elapsedTime)
      setFormValues((old) => ({ ...old, [name]: elapsedTime }))
    }
  }
  function closeComponent() {
    props.setRenderAddComponent(false)
    props.setErrorMessages([])
  }
  console.log(formValues.time);
  

  return (
    <div>
      <form onSubmit={(action) => handleFormSubmit(action)} noValidate>
        <input type="radio" className="btn-check" name="bookmark" id="bookmark" autoComplete='off' checked={!isSection} onClick={() => setIsSection(false)} readOnly />
        <label className="btn btn-light w-50" htmlFor="bookmark" >Bookmark</label>

        <input type="radio" className="btn-check" name="section" id="section" autoComplete='off' checked={isSection} onClick={() => setIsSection(true)} readOnly />
        <label className="btn btn-light w-50" htmlFor="section" >Section</label>

        <div className='form-floating my-1' >
          <input
            className={"form-control my-2 w-100"}
            id='nameInsert'
            type={"text"}
            placeholder="Name"
            name='name'
            value={formValues.name}
            onChange={(action) => handleFormInput(action)}
            required={true}
          />
          <label htmlFor='nameInsert'>Name</label>
        </div>
        <div className='row'>
          <div className='col-9'>
            <InputTime timeInSeconds={formValues.time} setTimeInSeconds={setFormValues} />
          </div>
          <div className="col-auto">
            <input type="checkbox" className="btn-check" id="time" autoComplete="off" checked={false} onClick={() => handleSetCurrentTime("time")} readOnly />
            <label className="btn btn-primary w-100" htmlFor="time" >Time</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-9'>
            <div className='form-floating my-1' >
              <input
                className={"form-control my-2 w-100"}
                id='endTimeInsert'
                type={"text"}
                placeholder="End-Time"
                value={formValues.endTime}
                name="endTime"
                onChange={(action) => handleFormInput(action)}
                disabled={!isSection}
              />
              <label htmlFor='endTimeInsert'>End-Time</label>
            </div>
          </div>
          <div className="col-auto">
            <input type="checkbox" className="btn-check" id="endTime" autoComplete="off" checked={false} onClick={() => handleSetCurrentTime("endTime")} readOnly />
            <label className="btn btn-primary w-100" htmlFor="endTime" >Time</label>
          </div>
        </div>
        {displayErrors()}
        <button className='btn btn-danger w-50' name='submit' type='submit'>Add New Mark</button>
        <button className='btn btn-light w-50' name='close' onClick={() => closeComponent()}>Back</button>
      </form>
    </div>
  )
}
