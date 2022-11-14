import React, { useState } from 'react'
import { CurrentVideoStats } from '../models/CurrentVideoStats'
import { Mark } from '../models/Mark'
import InputTime from './InputTime'
import "./CreateNewMark.css"

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
    <form onSubmit={(action) => handleFormSubmit(action)} className="form-input">
      <span className='buttons'>
        <input
          type="radio"
          className="btn-check"
          name="bookmark"
          id="bookmark"
          autoComplete='off'
          checked={!isSection}
          onClick={() => setIsSection(false)}
          readOnly
        />
        <label
          className="btn btn-light w-50"
          htmlFor="bookmark"
        >
          Bookmark
        </label>

        <input
          type="radio"
          className="btn-check"
          name="section"
          id="section"
          autoComplete='off'
          checked={isSection}
          onClick={() => setIsSection(true)}
          readOnly />
        <label
          className="btn btn-light w-50"
          htmlFor="section"
        >
          Section
        </label>
      </span>
      <div className='form-floating' >
        <input
          className={"form-control w-100"}
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

      <span className='time-input'>
      Start-Time:
        <InputTime key={1} timeInSeconds={formValues.time} setTimeInSeconds={setFormValues} isNotActive={false} attribute={"time"} />
        <p className='time-button'>
          <input type="checkbox" className="btn-check " id="time" autoComplete="off" checked={false} onClick={() => handleSetCurrentTime("time")} readOnly />
          <label className="btn btn-secondary w-100" htmlFor="time" >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </label>
        </p>
      </span>

      <span className='time-input' >
      End - Time:
        <InputTime timeInSeconds={formValues.endTime || 0} setTimeInSeconds={setFormValues} isNotActive={!isSection} attribute={"endTime"} />
        <p className='time-button'>
          <input type="checkbox" className="btn-check time-button" id="endTime" autoComplete="off" checked={false} onClick={() => handleSetCurrentTime("endTime")} readOnly />
          <label className="btn btn-secondary w-100" htmlFor="endTime" >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </label>
        </p>
      </span>
      {displayErrors()}
      <span className='buttons'>
        <button className='btn btn-danger w-50' name='submit' type='submit'>Add New Mark</button>
        <button className='btn btn-light w-50' name='close' onClick={() => closeComponent()}>Back</button>
      </span>
    </form>
  )
}
