import React, { Component } from 'react'
import Request from 'superagent'
import _ from 'lodash'

import StudentListRow from './StudentListRow'

class StudentList extends Component {

    constructor(){
        super();
        this.getStudentList = this.getStudentList.bind(this);
    }

    getStudentList(){
        return _.map(this.props.studentsListTable, (student, index) => <StudentListRow key={index} student = {student} getStudentStats = {this.props.getStudentStats}/>);
    }

    render() {
        return (
            <table>
            <tbody>
                <tr>
                   <th>ID</th>
                   <th>Attempts</th>
                   <th>Correct</th>
                </tr>
                {this.getStudentList()}
                </tbody>
            </table>
        )
    }
}

export default StudentList
