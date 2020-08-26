import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    // constructor(props){
    //     super(props);
    //     // this.state = {}
    // }

    render(){
        const title = this.props.data.title
        return (
            <div className="card">
                <h3>{title}</h3>
                <img src={this.props.data.imgsrc} alt="Chemical Structure"></img>
                <hr></hr>
            <p>{this.props.data.extract}</p>
            </div>
        )
    }
}

export default ResultDisplayCard