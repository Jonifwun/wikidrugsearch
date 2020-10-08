import React, { Component } from 'react';
import DataDisplay from './DataDisplay'

class RelatedDisplayCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            doc: '',
            tableItemsObject: {},
            imageURL: '',
            chemSpiderLink: '',
            CASNumber: '',
            StdInChI: '',
            IUPACname: '',
            IUPHARligand: '',
            chemSpiderID: ''
        }
        this.getChemSpiderURL = this.getChemSpiderURL.bind(this)
        this.getData = this.getData.bind(this)
        // this.getChemSpiderData = this.getChemSpiderData.bind(this)
    }
    
    getChemSpiderURL = () => {

        const links = this.state.doc.querySelectorAll('a')

        let chemspiderurl;
        
        links.forEach(function(link){
          let attribute = link.getAttribute('href')
          if(attribute.includes('chemspider')){
            chemspiderurl = attribute
            }
        })

        this.setState({

         chemSpiderLink: chemspiderurl,
         
        })

    }

    getData = () => {

        const data = this.state.tableItemsObject.parts[0].template.params
        console.log(data)
    
      
        let CASNumber  = data.CAS_number.wt ? data.CAS_number.wt : '';
        let StdInChI = data.StdInChI.wt ? data.StdInChI.wt : '';
        let IUPACname = data.IUPAC_name.wt ? data.IUPAC_name.wt : '';
        IUPACname = IUPACname.replaceAll(/<[^>]*>?/gm, '')
        // let chemSpiderID = data.ChemSpiderID.wt ? data.ChemSpiderID.wt : '';

        this.setState({
            CASNumber,
            StdInChI,
            IUPACname,
            // chemSpiderID
    })
}

    getChemSpiderData = () => {
          //    var chemurl = new URL("https://api.rsc.org/compounds/v1/records/5541/details"),
        //     params = { fields: [{
        //         "CommonName": "dexamethasone"
        //     }] }
        //     Object.keys(params).forEach(key => chemurl.searchParams.append(key, params[key]))
        // const options = {
        //     method: "POST",
        //     headers: {
        //       "apikey": "ubG2bhMljAJqbEN6BpyYFqGnvjcJCGzF",  
        //       "Accept": "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     mode: 'no-cors',
        //     body: JSON.stringify({
        //       "name": "dexamethasone"
        //     }),
        //   };
        //    return fetch("https://api.rsc.org/compounds/v1/filter/name", options)
        //    .then(response => response.text())
        //    .then(data => {
        //        console.log('ChemSpy:', data)
        //    })
    }

    componentDidMount(){

       

        let { title } = this.props.data
       

        fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${ title }`)
            .then(response => response.json())
            .then(data => {
                                 
                let url = data.items[0].srcset[0].src
                this.setState({
                    imageURL: url

            })
             
         return fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${title}`)
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

            this.getChemSpiderURL()
            this.getData()
         })        
        }).catch((err) => {
            console.log(err)
    })

}    

    
    render(){

        const { title, extract, pageid } = this.props.data
        const { imageURL,chemSpiderLink } = this.state
        let pageURL = `http://en.wikipedia.org/?curid=${pageid}`        
        
        return (
            <div className="card">
                <h5>{ title.replaceAll('_', ' ') }</h5>
                <div className="container">
                    <div className="row">
                        { imageURL ? <img className="structure" src={ imageURL } alt="Chemical Structure"></img> : null }
                    </div>
                </div>
                {<DataDisplay data={this.state}/>}

                <hr></hr>

                <p className="extract">{ extract }</p>
                <div className="links">
                    <div className="container">
                        <a href={ pageURL } className="btn link">See full article</a>
                    </div>
                        { chemSpiderLink ? 
                            <div className="container">
                                <a href={ chemSpiderLink } target="_blank" rel="noopener noreferrer" className="btn link" id="chemSpy">Go to ChemSpider</a>
                            </div>
                        : null
                        }
                        
                </div>
            </div>
        )
    }
}

export default RelatedDisplayCard