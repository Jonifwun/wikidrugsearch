import React, { Component } from 'react';

class RelatedDisplayCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL: '',
            chemSpiderLink: ''
        }
    }    

    componentDidMount(){

        const {title} = this.props.data

        fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${title}`)
            .then(response => response.json())
            .then(data => {
                                 
                let url = data.items[0].srcset[0].src
                this.setState({
                    imageURL: url
            })
             
         return fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${title}`)
         .then(response => response.text())
         .then(htmldata => {
           //CONTAINS ALL THE HTML FROM THE PAGE.
           var parser = new DOMParser();
           var doc = parser.parseFromString(htmldata, "text/html");

           
           //WHAT ABOUT GETTING THE CHEM SPIDER LINK - View On ChemSpider button?
           const links = doc.querySelectorAll('a')
           let chemspiderurl;
           links.forEach(function(link){
             let attribute = link.getAttribute('href')
             if(attribute.includes('chemspider')){
               
              chemspiderurl = attribute
               
             }
           })
           this.setState({
             chemSpiderLink: chemspiderurl
           }) 
    })
    }).catch((err) => {
        console.log(err)
}
)}    

    
    render(){
        const { title, extract, pageid} = this.props.data
        let pageURL = `http://en.wikipedia.org/?curid=${pageid}`
        
        return (
            <div className="card">
                <h5>{title}</h5>

                {this.state.imageURL ? <img className="structure" src={this.state.imageURL} alt="Chemical Structure"></img> : null}
                
                <hr></hr>
            <p className="extract">{extract}</p>
            <div className="links">
                    <div className="container">
                        <a href={pageURL} className="btn link">See full article</a>
                    </div>
                    { this.state.chemSpiderLink ? 
                        <div className="container">
                            <a href={this.state.chemSpiderLink} className="btn link" id="chemSpy">Go to ChemSpider</a>
                        </div>
                        : null
                    }
                    
                </div>
            </div>
        )
    }
}

export default RelatedDisplayCard