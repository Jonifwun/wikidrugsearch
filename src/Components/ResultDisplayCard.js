import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    
    render(){
        const { title, imgsrc, extract, pageURL, searched, synthesisURL} = this.props.data
        
        if (searched === false){
            return null
        }
        
        return (
            <div className="card">
                <h5>{title}</h5>
                <img className="structure" src={imgsrc} alt="Chemical Structure"></img>
                {synthesisURL ? <img className="structure" src={synthesisURL} alt={`${title} synthesis`}></img> : null}

                
                <hr></hr>
            <p className="extract">{extract}</p>
            <a href={pageURL}>See full article</a>
            </div>
        )
    }
}

export default ResultDisplayCard