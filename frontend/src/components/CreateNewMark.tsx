import React, { useState } from 'react'
import { CurrentVideoStats } from '../models/CurrentVideoStats'
import { Mark } from '../models/Mark'
type CreateNewMarkProps = {
  setRenderAddComponent: (state: boolean) => void
  addNewMark: (newMark: Mark) => void
  currentVideoStats: CurrentVideoStats
  player: any
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
    action.preventDefault()
    let newMarkToSend = formValues;
    newMarkToSend.dedicatedVideoId = props.currentVideoStats.videoId
    if (newMarkToSend.endTime === 0) {
      newMarkToSend.endTime = undefined;
    }
    props.addNewMark(newMarkToSend)
    setFormValues(emptyFormPlaceholder)
  }

  function handleSetCurrentTime(name: string) {
    if(props.player) {
      let elapsedTime: number = props.player.getCurrentTime()
      setFormValues((old) => ({ ...old, [name]: elapsedTime }))
    }
  }

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
        <div className='row'>
          <div className='col-9'>
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
          </div>
          <div className="col-auto">
            <input type="checkbox" className="btn-check" id="btn-check" autoComplete="off" checked={false} onClick={() => handleSetCurrentTime("time")} readOnly/>
              <label className="btn btn-primary w-100" htmlFor="btn-check" >Time</label>
          </div>
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
        <button className='btn btn-danger w-50' type='submit'>Add New Mark</button>
        <button className='btn btn-light w-50' onClick={() => props.setRenderAddComponent(false)}>Back</button>
      </form>
    </div>
  )
}
