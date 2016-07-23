import React, { Component } from 'react'
import rd3 from 'rd3';
import {FormGroup, FormControl,ControlLabel} from 'react-bootstrap'


const PieChart = rd3.PieChart

class StudentSubTopicAccuracy extends Component {

    getAccuracy(correct, attempts){
        let temp = correct/attempts*100
        return Math.round( temp * 10 ) / 10
    }
    getValues(){
        var subtypes = this.props.subTypeAccuracy;
        var temp = [];
        for(let i=0;i<subtypes.length;i++){
            temp.push({label: subtypes[i].Name, value: this.getAccuracy(subtypes[i].Correct, subtypes[i].Attempts)})
        }
        return temp
    }


    getOptions(){
        var opt=[];
        for(let i=0;i<this.props.subTopics.length;i++){
            if(this.props.subTopics[i].Name == this.props.currentSubTopic)
                opt.push(<option key ={this.props.subTopics[i].Name}  value= {this.props.subTopics[i].Name} selected> {this.props.subTopics[i].Name}</option>)
            else
                opt.push(<option key = {this.props.subTopics[i].Name} value= {this.props.subTopics[i].Name}> {this.props.subTopics[i].Name}</option>)
        }
        return opt
    }
    handleChange(e){
        var options = e.target.options;
        var self = this
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                self.props.getSubTypeAccuracy(self.props.id, value)
                break;
            }
          }
    }
    render() {
        var pieData = this.getValues();
        var style = {
            main: {
                'display':'flex',
                'flexDirection':'row',
            },
            select:{
                'width': '100px',
                'height':'20px',
            },
            options:{
                'marginTop': '50px',
                'marginBottom':'-10px'
            }
        }


        return  (
            <div>
            <div style = {style.options}>
            <select style= {style.select} onChange={this.handleChange}>
            {this.getOptions()}
            </select>
            </div>
            <PieChart
              data={pieData}
              width={450}
              height={400}
              radius={110}
              innerRadius={20}
              sectorBorderColor="black"
              title="Student's SubType Accuracy" />
          </div>
        )
    }
}

export default StudentSubTopicAccuracy
