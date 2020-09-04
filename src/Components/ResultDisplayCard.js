import React, { Component } from 'react';

class ResultDisplayCard extends Component {
    
    render(){
        const { title, imgsrc, extract, pageURL, searched, synthesisURL, chemSpiderLink } = this.props.data
        
        if (searched === false){
            return null
        }
        
        return (
            <div className="card">
                <h5>{ title }</h5>
                <div>

                    <img className="structure" src={ imgsrc } alt="Chemical Structure"></img>

                    { synthesisURL ? <img className="structure" src={ synthesisURL } alt={`${ title } synthesis`}></img> : null }

                </div>

                
                <hr></hr>
            <p className="extract">{ extract }</p>
                <div className="links">
                    <div className="container">
                        <a href={ pageURL } className="btn link">See full article</a>
                    </div>
                    <div className="container">
                        <a href={ chemSpiderLink } target="_blank" rel="noopener noreferrer" className="btn link" id="chemSpy">Go to ChemSpider</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default ResultDisplayCard