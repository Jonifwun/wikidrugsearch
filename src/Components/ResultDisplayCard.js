import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    
    render(){
        const { title, imgsrc, extract, pageURL, searched } = this.props.data
        
        if (searched === false){
            return null
        }
        
        return (
            <div className="card">
                <h5>{title}</h5>
                <img src={imgsrc} alt="Chemical Structure"></img>
                <hr></hr>
            <p>{extract}</p>
            <a href={pageURL}>See full article</a>
            </div>
        )
    }
}

export default ResultDisplayCard