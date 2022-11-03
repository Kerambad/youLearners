import React from 'react'
type CreateNewMarkProps = {
    setRenderAddComponent: (state: boolean) => void
}

export default function CreateNewMark(props: CreateNewMarkProps) {
  return (
    <div>
        <button className='col-6 btn btn-danger w-50' onClick={() => props.setRenderAddComponent(false)}>Back</button>
    </div>
  )
}
