import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    
    render(){
        const { title, imgsrc, extract, pageURL, searched, synthesisURL, chemSpiderLink} = this.props.data
        
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
                <div className="links">
                    <div className="container">
                        <a href={pageURL} className="btn link">See full article</a>
                    </div>
                    <div className="container">
                        <a href={chemSpiderLink} className="btn link" id="chemSpy">Go to ChemSpider</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default ResultDisplayCard