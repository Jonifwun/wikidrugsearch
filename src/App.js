import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // loading: false,

      drugSearchTerm: '',
      searchResults: []
    }
    // this.componentDidMount.bind(this)
    this.changeDrugSearchTerm.bind(this)
    this.searchWiki.bind(this)
  }

//   componentDidMount() {

//     this.setState({
//       searchResults: [],
//       // loading: true
//     })

// }

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
    let url = "https://en.wikipedia.org/w/api.php"
    console.log('hi')
    const params = {
      action: "query",
      list: "search",
      srsearch: this.state.drugSearchTerm,
      format: "json"
  }

  url = url + '?origin=*';
  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key];
  });

    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
               searchResults: data
            })
            console.log(data)
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

    </div>
    </div>
      </div>
    );
}
}

export default App;
