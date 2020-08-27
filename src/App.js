import React from 'react';
import './App.css';
import ResultDisplayCard from './Components/ResultDisplayCard.js'
import NoResultCard from './Components/NoResultCard.js'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // loading: false,
      searched: false,
      drugSearchTerm: '',
      searchResults: [],
      title: '',
      imgsrc: '',
      description: '',
      extract: '',
      pageID: '',
      searchSuccess: true,
      synthesisURL: ''
    }
    
    this.changeDrugSearchTerm.bind(this)
    this.searchWiki.bind(this)
    // this.resetState.bind(this)
  }

  changeDrugSearchTerm = (event) => {
    event.preventDefault();

    this.setState({
      drugSearchTerm: event.target.value
    });
    
  }

  // resetState = () => {
  //   this.setState({
  //     title: '',
  //     imgsrc: '',
  //     description: '',
  //     extract: '',
  //     pageID: '',
  //     pageURL: '',
  //     searchSuccess: false
  //   })
  // }

  searchWiki = (event) => {
    event.preventDefault();

    this.setState({
      searchResults: [],
      searched: true
    })
    let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"
    
    const searchValue = this.state.drugSearchTerm

    url += searchValue
  

    fetch(url)
        .then(response => response.json())
        .then(data => {
          
          console.log(data)
          const description = data.description

          const descriptions = ['chemical', 'medication', 'drug'];
         
          const filtered = descriptions.filter((desc) => {
            return (
              description.includes(desc)
            )
          })

          if(!filtered.length){
            throw new Error('No Drugs Were Found With That Name')
          }
          // if(!data.description.includes(desc)){
          //   throw new Error()
          // }

            if(data.title !== "Not found."){
                this.setState({
                  title: data.title,
                  imgsrc: data.thumbnail.source,
                  description: data.description,
                  extract: data.extract,
                  pageID: data.pageid,
                  pageURL: `http://en.wikipedia.org/?curid=${data.pageid}`,
                  searchSuccess: true
                })
            } else {
              throw new Error('Search Error, no result found')
            }

          
            fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${searchValue}`)
              .then(response => response.json())
              .then(data => {
                
                const synthesis = data.items.filter((item) => {
                  let mediaDesc = ''
                  if(item.caption){
                    mediaDesc = item.caption.text
                  } 
                  return(
                    mediaDesc.includes('synthesis') 
                  )
                })
                console.log(synthesis)
                if(synthesis.length){
                  let synthesisURL = synthesis[0].srcset[0].src
                  console.log(synthesisURL)
                  this.setState({
                    synthesisURL: synthesisURL
                  })
                }
              })
          
        }).catch((err) => {
          console.log(err)
          this.setState({
          searchSuccess: false,
          // searched: false
          })
        })
          // this.resetState()
      }
  

  render(){

    // const text = this.state.loading ? "loading..." : null;

    return (
      <div className="App">
        <div className="container">
        <div className="card">
        <h3>Wiki Drug Search</h3>
        <div id="searchForm" className="input-field">
      <form>    
        <input id="searchDrug" className="materialize-textarea" value={this.state.drugSearchTerm || ''} onChange={this.changeDrugSearchTerm} name="search" placeholder="Search By Drug Name" autoFocus></input>
        <div className="row">
          <div className="col s12 m4">
            <button id="searchButt" className="btn waves-effect waves-light " onClick={this.searchWiki} type="submit" name="action"><i className="material-icons left">search</i>Submit</button>
          </div>
          <div className="col s12 m4">
            <button id="clear" className="btn waves-effect waves-light "><i className="material-icons left">youtube_searched_for</i>Clear Search</button>
          </div>
          <div className="col s12 m4">
            <button id="searchButt" className="btn waves-effect waves-light " type="submit" name="action"><i className="material-icons left">help_outline</i>Random</button>
          </div>
        </div>
      </form>
          </div>
    </div>
  
      <div id="output">
      <ResultDisplayCard data={this.state}/>
      <NoResultCard searchSuccess={this.state.searchSuccess} pageID={this.state.pageID}/>
    </div>
  
    
    </div>
      </div>
    );
}
}

export default App;
