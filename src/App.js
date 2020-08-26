import React from 'react';
import './App.css';
import ResultDisplayCard from './Components/ResultDisplayCard.js'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // loading: false,

      drugSearchTerm: '',
      searchResults: [],
      title: '',
      imgsrc: '',
      description: '',
      extract: '',
      pageID: ''
    }
    
    this.changeDrugSearchTerm.bind(this)
    this.searchWiki.bind(this)
  }

  changeDrugSearchTerm = (event) => {
    event.preventDefault();

    this.setState({
      drugSearchTerm: event.target.value
    });
    
  }

  searchWiki = (event) => {
    event.preventDefault();

    this.setState({
      searchResults: []
    })
    let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"
    
    const searchValue = this.state.drugSearchTerm

    url += searchValue
  

  //   const params = {
  //     action: "query",
  //     list: "search",
  //     srsearch: this.state.drugSearchTerm,
  //     format: "json"
  // }

  // url = url + '?origin=*';
  // Object.keys(params).forEach((key) => {
  //   url += "&" + key + "=" + params[key];
  // });

    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
               title: data.title,
               imgsrc: data.thumbnail.source,
               description: data.description,
               extract: data.extract,
               pageID: data.pageid,
               pageURL: `http://en.wikipedia.org/?curid=${data.pageid}`
            })
            console.log(data)
            console.log(this.state)
        })
        
  }

  render(){

    // const text = this.state.loading ? "loading..." : null;

    return (
      <div className="App">
        <div className="container">
        <div className="card">
        <h1>Wiki Drug Search</h1>
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
    </div>
    </div>
      </div>
    );
}
}

export default App;
