import React from 'react'
import Main from './Components/Main'

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
    this.resetState.bind(this)
    this.resultFilter.bind(this)
  }

  changeDrugSearchTerm = (event) => {
    event.preventDefault();

    this.setState({
      drugSearchTerm: event.target.value
    });
    
  }


  resetState = () => {
    this.setState({
      searched: false,
      title: '',
      imgsrc: '',
      description: '',
      extract: '',
      pageID: '',
      pageURL: '',
      searchSuccess: false
    })
  }

  resultFilter = (data) => {

    const description = data.description.toLowerCase()

    const descriptions = ['chemical', 'medication', 'drug', 'antibiotic', 'enantiomers', 'inhibitor', 'racemic', 'painkiller'];
   
    const filtered = descriptions.filter((desc) => {
      return (
        description.includes(desc)
      )
    })
      return filtered
    }

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
        .then(response => {
          if(response.ok){
            return response.json()
          } else {
            this.resetState()
            return Promise.reject(`You have a ${response.status} error`)
          }
          
        })
        .then(data => { 
   
          const filtered = this.resultFilter(data)
            
          if(filtered.length === 0){
            console.log('hi')
            this.resetState();
            console.log(this.state)
            throw new Error('No Drugs Were Found With That Name')
          }
        
            if(data.title !== "Not found."){
              console.log(data)
                this.setState({
                  title: data.title,
                  relatedMaterial: [],
                  description: data.description,
                  extract: data.extract,
                  pageID: data.pageid,
                  pageURL: `http://en.wikipedia.org/?curid=${data.pageid}`,
                  searchSuccess: true
                })
            } else if(data.title === "Not found.") {      
                this.resetState();
                throw new Error('Search Error, no result found')
            }


            //FETCH MEDIA ITEMS AND CHECK FOR SYNTHESIS
            return fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${searchValue}`)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                this.setState({
                  imgsrc: data.items[0].srcset[0].src
                })
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
                //ANOTHER FINAL FETCH TO OBTAIN RELATED PAGES
                return fetch(`https://en.wikipedia.org/api/rest_v1/page/related/${searchValue}`)
                .then(response => response.json())
                .then(data => {
                  console.log('related pages:', data)
                })
              })
              
              
          
        }).catch((err) => {
          console.log(err)
          this.setState({
          searchSuccess: false,
          })
        })
      }
  

  render(){

    // const text = this.state.loading ? "loading..." : null;

    return (
      <Main 
        data={this.state}
        searchWiki={this.searchWiki}
        changeDrugSearchTerm={this.changeDrugSearchTerm}
        resetState={this.resetState}
      />
    );
}
}

export default App;
