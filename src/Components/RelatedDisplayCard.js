import React, { Component } from 'react';

class RelatedDisplayCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL: ''
        }
    }    

    componentDidMount(){

        fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${this.props.data.title}`)
                             .then(response => response.json())
                             .then(data => {
             let url = data.items[0].srcset[0].src
             this.setState({
                imageURL: url
            })
             
         })  
    }    

    
    render(){
        const { title, extract, pageid} = this.props.data
        let pageURL = `http://en.wikipedia.org/?curid=${pageid}`
        
        return (
            <div className="card">
                <h5>{title}</h5>
                <img className="structure" src={this.state.imageURL} alt="Chemical Structure"></img>
                
                <hr></hr>
            <p>{extract}</p>
            <a href={pageURL}>See full article</a>
            </div>
        )
    }
}

export default RelatedDisplayCard