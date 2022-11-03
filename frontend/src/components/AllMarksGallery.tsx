import React, { useState } from 'react'
import { Mark } from '../models/Mark'
import MarkElement from './MarkElement'

type AllMarksGalleryProps = {
    marks: Mark[]
    activeComponent: number;
}

export default function AllMarksGallery(props: AllMarksGalleryProps) {

    const [filterText, setFilterText] = useState("")

    function filterMarks() {
        return (
            props.marks.filter((mark) => mark.name.toLowerCase()
                .includes(filterText.toLowerCase())))
    }

    if (props.activeComponent !== 3) return null;
    return (
        <div>
            <div className='form-floating my-1'>
                <input
                    className={"form-control my-2 w-100"}
                    id='filterTextInsert'
                    type={"text"}
                    placeholder="Filter"
                    value={filterText}
                    onChange={(action) => setFilterText(action.target.value)}
                />
                <label htmlFor='filterTextInsert'>Filter</label>
            </div>
            {filterMarks().map((mark, key) => <MarkElement mark={mark} key={key} />)}
        </div>
    )
}
