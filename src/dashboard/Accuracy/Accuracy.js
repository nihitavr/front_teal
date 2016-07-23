import React, { Component } from 'react'
import rd3 from 'rd3';


const PieChart = rd3.PieChart;

class Accuracy extends Component {

    getCorrect(){
        let temp = this.props.studentAccuracy.Correct/this.props.studentAccuracy.Attempt*100
        return Math.round( temp * 10 ) / 10;

    }
    getWrong(){
        let temp = (this.props.studentAccuracy.Attempt - this.props.studentAccuracy.Correct)/this.props.studentAccuracy.Attempt*100;
        return Math.round( temp * 10 ) / 10;
    }

    render() {
        var pieData = [
            {label: "Correct", value: this.getCorrect()},
            {label: "Wrong", value: this.getWrong()}
        ]


        return  (
            	<PieChart
                  data={pieData}
                  width={450}
                  height={400}
                  radius={110}
                  innerRadius={20}
                  sectorBorderColor="black"
                  title="Student's Accuracy" />
      )
    }
}

export default Accuracy
