import React, { Component } from 'react'
import Request from 'superagent'

class StudentListRow extends Component {

    constructor(){
        super()
        this.onStudentClick = this.onStudentClick.bind(this)
    }

    onStudentClick(){
        this.props.getStudentStats(this.props.student.StudentID)
    }

    render() {
        return (
            <tr onClick={this.onStudentClick}>
                <td>{this.props.student.StudentID}</td>
                <td>{this.props.student.Attempt}</td>
                <td>{this.props.student.Correct}</td>
             </tr>
          )
    }
}

export default StudentListRow
