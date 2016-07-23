import React, { Component } from 'react'
import rd3 from 'rd3';

const BarChart = rd3.BarChart

class StudentSubTopicAccuracy extends Component {

    getCorrectValues(){
        let temp = {}
        temp["values"] = []
        var subtopics = this.props.subTopicAccuracy;
        for(let i=0;i<subtopics.length; i++){
            temp.values.push({"x": subtopics[i].Name, "y": subtopics[i].Correct})
        }
        return temp
    }

    getWrongValues(){
        let temp = {}
        temp["values"] = []
        var subtopics = this.props.subTopicAccuracy;
        for(let i=0;i<subtopics.length; i++){
            temp.values.push({"x": subtopics[i].Name, "y": subtopics[i].Attempts - subtopics[i].Correct })
        }
        return temp
    }

    render() {
        var barData = [
          this.getCorrectValues(),
          this.getWrongValues()
        ];
        return  (

                <BarChart
                  data={barData}
                  width={450}
                  height={400}
                  radius={110}
                  xAxisLabel="Value"
                  yAxisLabel="SubTopic"
                  title="Student's Topic Accuracy" />
      )
    }
}

export default StudentSubTopicAccuracy
