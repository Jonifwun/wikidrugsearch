import React, { Component } from 'react'
import DataDisplay from './DataDisplay'

class ResultDisplayCard extends Component {

    constructor(props){
        super(props)
        this.state= {
            synthesisDisplay: false,
            CASNumber: '',
            StdInChI: '',
            IUPACname: '',
            doc: '',
            tableItemsObject: {}
        }
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({

            synthesisDisplay: !prevState.synthesisDisplay

        }))

    }

    getData = () => {

        const data = this.state.tableItemsObject.parts[0].template.params
        console.log(data)
    
      
        let CASNumber  = data.CAS_number.wt ? data.CAS_number.wt : '';
        let StdInChI = data.StdInChI.wt ? data.StdInChI.wt : '';
        let IUPACname = data.IUPAC_name.wt ? data.IUPAC_name.wt : '';
        IUPACname = IUPACname.replaceAll(/<[^>]*>?/gm, '')
       

        this.setState({
            CASNumber,
            StdInChI,
            IUPACname,
    })
}

    componentDidMount(){

        let { title } = this.props.data
        console.log('henlo', this.props.data)

        fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${ title }`)
            .then(response => response.text())
            .then(htmldata => {
        
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmldata, "text/html");

                
            const dataTable = doc.querySelector('.infobox')

            const tableItems = dataTable.getAttribute('data-mw')
            
            const tableItemsObject = JSON.parse(tableItems)
            
            this.setState({
                doc: doc,
                tableItemsObject: tableItemsObject, 
            })

            this.getData()
        }).catch((err) => {
            console.log(err)
        })
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
                    
                    { this.state.synthesisDisplay && synthesisURL ? 
                        <div className="card synthesisCard">
                            <div id="synthesisTitle">
                                <h6>Synthesis:</h6>
                            </div>
                            <img src={ synthesisURL } alt={`${ title } synthesis`}></img>
                        </div> 
                    : null 
                    }
                </div>

                {<DataDisplay data={ this.state }/>}    
                
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