import React, { Component } from 'react'
import rd3 from 'rd3';


const PieChart = rd3.PieChart;

class StudentSubTopics extends Component {

    getPercent(value){
        var subtopics = this.props.studentSubTopics
        let total=0;
        for(let i=0;i< subtopics.length;i++){
            total+= subtopics[i].Attempts
        }

        return Math.round(value/total*100 *10)/10
    }

    getSubTopics(){
        let temp = []
        var subtopics = this.props.studentSubTopics
        for(let i=0;i< subtopics.length;i++){
            temp.push({label: subtopics[i].Name, value: this.getPercent(subtopics[i].Attempts)})
        }
        return temp
    }

    render() {

        var pieData = this.getSubTopics()

        return  (
    	<PieChart
          data={pieData}
          width={500}
          height={400}
          radius={110}
          innerRadius={20}
          sectorBorderColor="black"
          title="Student's Attempted Topics" />
      )
    }
}

export default StudentSubTopics
