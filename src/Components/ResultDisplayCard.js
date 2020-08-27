import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    // constructor(props){
    //     super(props);
    //     // this.state = {}
    // }

    render(){
        if (this.props.data.searched === false){
            return null
        }
        const title = this.props.data.title
        return (
            <div className="card">
                <h5>{title}</h5>
                <img src={this.props.data.imgsrc} alt="Chemical Structure"></img>
                <hr></hr>
            <p>{this.props.data.extract}</p>
            </div>
        )
    }
}

export default ResultDisplayCard