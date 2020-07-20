import React from 'react'
import logo from "../media/logo.png";

export default function MainLogo(props){
    return <div className={`brand-logo ${props.className || ""}`}>
        <img src={props.photo ? props.photo : logo} alt="logo" />
    </div>
}


// <li draggable={true}
//     onDragStart={e => this.onDragStart(e, index)}
//     onDragOver={e => this.onDragOver(e)}
//     onDrop={e => this.onDrop(e, index)}>
//         hashsa
//     </li>


// onDragStart(e, i) {
//     e.dataTransfer.setData('idx', i)
//     this.setState({ edit: '', newCalendar: false })
// }

// onDragOver(e) {
//     e.preventDefault()
// }

// onDrop(e, i) {
//     let idx = e.dataTransfer.getData('idx')
//     let calendars = this.state.calendars
//     let a = calendars[idx]
//     calendars.splice(idx, 1)
//     calendars.splice(i, 0, a)
// }