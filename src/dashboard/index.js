import React, { Component } from 'react'
import Request from 'superagent'
import StudentList from './StudentTable/StudentList'
import Accuracy from './Accuracy/Accuracy'
import StudentSubTopics from './StudentSubtopics/StudentSubTopics'
import StudentSubTopicAccuracy from './StudentSubTopicAccuracy/StudentSubTopicAccuracy'
import StudentSubTypeAccuracy from './StudentSubTypeAccuracy/StudentSubTypeAccuracy'
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            classSelected: true,
            items: [],
            studentID : null,
            studentAccuracy : {},
            studentSubTopics: {},
            subTopicAccuracy:{},
            subTypeAccuracy:{},
            currentSubTopic:"",
         };
        this.getStudentTableList = this.getStudentTableList.bind(this)
        this.getStudentStats = this.getStudentStats.bind(this)
    }

    componentDidMount() {
        let self = this;
        Request
            .get('https://raw.githubusercontent.com/nihitavr/front_teal/master/src/dashboard/data.json')
            .end(function(err, res){
                var data = JSON.parse(res.text);
                self.setState({
                        items: data
                })
        });
    }

    getStudentTableList(){
        let arr = {}
        let students = this.state.items;
        for(let i=0;i<students.length; i++){
                if(arr.hasOwnProperty(students[i].StudentID)){
                    arr[students[i].StudentID].StudentID = students[i].StudentID
                    arr[students[i].StudentID]["Attempt"] ++
                    if(students[i].Correct) arr[students[i].StudentID]["Correct"]++
                }else {
                    let temp = {
                        StudentID:students[i].StudentID,
                        Attempt: 1,
                    }
                    temp["Correct"] = students[i].Corrent ? 1:0;
                    arr[students[i].StudentID] = temp;
                }
        }

        let temp = [];
        for(var key in arr){
            temp.push(arr[key])
        }
        return temp
    }

    getStudentAccuracy(studentID){

        let students = this.getStudentTableList();

        for(let i=0;i<students.length;i++){
            if(students[i].StudentID==studentID)
                return students[i]
        }
        return null
    }

    getStudentSubTopics(studentID){
        let students = this.state.items;
        let subtopics = {}
        for(let i=0;i<students.length;i++){
            if(students[i].StudentID == studentID){
                if(subtopics[this.getParsedAssesment(students[i]).SubTopic]){
                    // console.log(this.getParsedAssesment(students[i]);
                    subtopics[this.getParsedAssesment(students[i]).SubTopic].Attempts ++
                }
                else{

                    var temp = {
                        Name: this.getParsedAssesment(students[i]).SubTopic,
                        Attempts: 1,
                    }
                    subtopics[this.getParsedAssesment(students[i]).SubTopic] = temp
                }

            }
        }

        var temp =[]
        for(let key in subtopics)
            temp.push(subtopics[key])

        return temp
    }

    getSubTopicsAccuracy(studentID){
        let students = this.state.items
        let subtopics = {}
        for(let i=0;i<students.length;i++){
            if(students[i].StudentID == studentID){
                if(subtopics[this.getParsedAssesment(students[i]).SubTopic]){
                    subtopics[this.getParsedAssesment(students[i]).SubTopic].Attempts ++
                    if(this.getParsedAssesment(students[i]).Correct) subtopics[this.getParsedAssesment(students[i]).SubTopic].Correct++;
                }
                else{
                    var temp = {
                        Name: this.getParsedAssesment(students[i]).SubTopic,
                        Attempts: 1,
                    }
                    temp["Correct"] = this.getParsedAssesment(students[i]).Correct ? 1:0;
                    subtopics[this.getParsedAssesment(students[i]).SubTopic] = temp
                }

            }
        }
        var temp =[]
        for(let key in subtopics)
            temp.push(subtopics[key])

        return temp
    }

    getSubTypeAccuracy(studentID, subTopic){
        let students = this.state.items
        let subtypes = {}
        for(let i=0;i<students.length;i++){
            if(students[i].StudentID == studentID){
                if(this.getParsedAssesment(students[i]).SubTopic == subTopic){
                    if(subtypes[this.getParsedAssesment(students[i]).SubType]){
                        subtypes[this.getParsedAssesment(students[i]).SubType].Attempts ++
                        if(this.getParsedAssesment(students[i]).Correct) subtypes[this.getParsedAssesment(students[i]).SubType].Correct++;
                    }
                    else{
                        var temp = {
                            Name: this.getParsedAssesment(students[i]).SubType,
                            Attempts: 1,
                        }
                        temp["Correct"] = this.getParsedAssesment(students[i]).Correct ? 1:0;
                        subtypes[this.getParsedAssesment(students[i]).SubType] = temp
                    }
                }
            }
        }
        var temp =[]
        for(let key in subtypes)
            temp.push(subtypes[key])

        return temp
    }
    changeSubType(subtopic){
        let subTypeAccuracy = this.getSubTypeAccuracy(this.state.studentID, subtopic)

        this.setState({
            subTypeAccuracy: subTypeAccuracy,
            currentSubTopic: subtopic,
        })
    }

    getParsedAssesment(row){
        var assessment = {};
        assessment["StudentID"] = row.StudentID
        assessment["SubTopic"] = ""
        assessment["Grade"] = ""
        assessment["Section"] = ""
        assessment["Time"] = ""
        assessment["SubType"] = ""
        assessment["Correct"] = row.Correct;
        var temp = row.AssessmentItemID;

        assessment["Subject"] = temp[0];
        let i=0
        for(i=1;i<temp.length;i++){
            if(temp[i]==0)
                break;
            assessment["SubTopic"] += temp[i];
        }

        for(let j=0;j<2;j++){
            assessment["Grade"] += temp[i]
            i++
        }
        for(let j=0;j<3;j++){
            assessment["Section"] += temp[i]
            i++
        }
        for(let j=0;j<3;j++){
            i++
        }
        i++
        for(let j=0;j<14;j++){
            assessment["Time"] += temp[i]
            i++
        }
        for(let j=0;j<2;j++){
            assessment["SubType"] += temp[i]
            i++
        }

        return assessment;

    }

    getStudentStats(studentID){
        let studentAccuracy = this.getStudentAccuracy(studentID)
        let studentSubtopics = this.getStudentSubTopics(studentID)
        let studentSubtopicsAccuracy = this.getSubTopicsAccuracy(studentID)

        let subtopic = this.getParsedAssesment(this.state.items[0]).SubTopic
        let subTypeAccuracy = this.getSubTypeAccuracy(studentID, subtopic)
        this.setState({
            classSelected:false,
            studentAccuracy: studentAccuracy,
            studentSubTopics: studentSubtopics,
            subTopicAccuracy: studentSubtopicsAccuracy,
            subTypeAccuracy: subTypeAccuracy,
            studentID: studentID,
            currentSubTopic: subtopic,
        })
    }

    showStudentStats(){

        if(this.state.studentID){
            var subTopics = this.getStudentSubTopics(this.state.studentID);
            return (
                <div>
                    <h1>Student ID:  {this.state.studentID}</h1>
                    <Accuracy studentAccuracy = {this.state.studentAccuracy}/>
                    <StudentSubTopics studentSubTopics= {this.state.studentSubTopics}/>
                    <StudentSubTopicAccuracy subTopicAccuracy= {this.state.subTopicAccuracy}/>
                    <StudentSubTypeAccuracy id={this.state.StudentID} getSubTypeAccuracy = {this.getSubTypeAccuracy.bind(this)} subTypeAccuracy= {this.state.subTypeAccuracy} subTopics = {subTopics} currentSubTopic = {this.state.currentSubTopic}/>
                </div>
            )
        }else{
            return null
        }
    }

    onClassClick(){
        this.setState({
            classSelected:true,
            studentID:"",
        })
    }
    onStudentClick(){
        var temp = this.state.items[0];
        console.log(temp.StudentID);
        this.setState({
            classSelected:false,
            studentID: temp.StudentID,
        })
        this.getStudentStats(temp.StudentID)
    }

    render() {
        const style = {
            'display': 'flex',
            'flexDirection': 'row',
        };
        const innerStyle ={
            'backgroundColor': '#212121',
            'flexGrow': 1, /* default 0 */

        }
        const outerStyle ={
            'flexGrow': 10, /* default 0 */
            'overflow': 'auto'

        }
        const filterDivClass = {
            'color':'white',
            'margin':'0px 0px 10px 0px',
            'padding': '10px 10px 10px 10px',
            'backgroundColor': 'black'
        }
        const filterDivStudent = {
            'color':'white',
            'margin':'0px 0px 10px 0px',
            'padding': '10px 10px 10px 10px',
            'backgroundColor': 'black'
        }
        this.state.classSelected ? filterDivClass.backgroundColor = 'grey' : filterDivStudent.backgroundColor = 'grey';
        return (
            <div style={style}>
            <div style = {innerStyle}>
                <div>
                    <h2  style = { {'color':'white', 'marginBottom': '50px'} }>Filter</h2>
                    <div onClick={this.onClassClick.bind(this)} className="hov" style ={filterDivClass}>
                        Class
                    </div>
                    <div onClick={this.onStudentClick.bind(this)} className="hov" style ={filterDivStudent}>
                        Students
                    </div>

                </div>
            </div>
            <div style= {outerStyle}>
                <StudentList studentsListTable={this.getStudentTableList()} getStudentStats={this.getStudentStats}/>
                {this.showStudentStats()}
            </div>
            </div>

        )
    }
}


export default Dashboard
