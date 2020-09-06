import React, { Component } from 'react';

class ResultDisplayCard extends Component {

    constructor(props){
        super(props)
        this.state= {
            synthesisDisplay: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({
            synthesisDisplay: !prevState.synthesisDisplay
        }))

    }
    
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
                    
                    { this.state.synthesisDisplay ? 
                        <div className="card synthesisCard">
                            <div id="synthesisTitle">
                                <h5>Synthesis:</h5>
                            </div>
                            <img src={ synthesisURL } alt={`${ title } synthesis`}></img>
                        </div> 
                    : null 
                    }
                </div>

                
                <hr></hr>
            <p className="extract">{ extract }</p>
                <div className="links">
                    <div className="container">
                        <a href={ pageURL } className="btn link">See full article</a>
                    </div>
                    { synthesisURL ? 
                        <div className="container"><button className="btn" id="synthesisBtn" onClick={ this.handleClick }> 
                            { this.state.synthesisDisplay ? "Hide Synthesis": "Display Synthesis"}
                        </button></div> 
                    : null 
                    }
                    <div className="container">
                        <a href={ chemSpiderLink } target="_blank" rel="noopener noreferrer" className="btn link" id="chemSpy">Go to ChemSpider</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default ResultDisplayCard