import React from 'react'
import Main from './Components/Main'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searched: false,
      drugSearchTerm: '',
      searchResults: [],
      title: '',
      imgsrc: '',
      description: '',
      extract: '',
      pageID: '',
      searchSuccess: true,
      synthesisURL: '',
      relatedCompounds: [],
      chemSpiderLink: ''
    }
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
      synthesisURL: '',
      searchSuccess: false,
      chemSpiderLink: ''
    })
  }


  resultFilter = (data) => {

    const description = data.description.toLowerCase()

    const descriptions = ['chemical', 'medication', 'drug', 'antibiotic', 'enantiomers', 'inhibitor', 'racemic', 'painkiller', 'stimulant'];
   
    const filtered = descriptions.filter((desc) => {
      return (
        description.includes(desc)
      )
    })
      return filtered
    }

  searchWiki = (event) => {
    event.preventDefault();
    this.resetState()
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
          console.log(data)
          const filtered = this.resultFilter(data)
            
          if(filtered.length === 0){
            this.resetState();
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
            
                if(synthesis.length){
                  let synthesisURL = synthesis[0].srcset[0].src
                  this.setState({
                    synthesisURL: synthesisURL
                  })
                }
                //ANOTHER FINAL FETCH TO OBTAIN RELATED PAGES
                return fetch(`https://en.wikipedia.org/api/rest_v1/page/related/${searchValue}`)
                .then(response => response.json())
                .then(data => {


                  const relatedPages = data.pages
                 

                  const filteredRelatedCompounds = relatedPages.filter((page) => {
                    let desc;
                    if(page.description){

                      const descriptions = ['chemical', 'medication', 'antibiotic', 'enantiomers', 'inhibitor', 'racemic', 'painkiller', 'stimulant'];
                      desc = page.description
                      var value;
                      for(let i = 0; i < descriptions.length; i++){
                        if(desc.includes(descriptions[i])){
                          value = true;
                            break;
                        } else {
                          value = false
                        }
                      }
                    }
                    return value === true    
                  })

                  this.setState({
                    relatedCompounds: filteredRelatedCompounds
                  })


                        return fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${searchValue}`)
                        .then(response => response.text())
                        .then(htmldata => {
                          //CONTAINS ALL THE HTML FROM THE PAGE.
                          var parser = new DOMParser();
                          var doc = parser.parseFromString(htmldata, "text/html");

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
        data={ this.state }
        searchWiki={ this.searchWiki }
        changeDrugSearchTerm={ this.changeDrugSearchTerm }
        resetState={ this.resetState }
      />
    );
}
}

export default App;
