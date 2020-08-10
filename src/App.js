import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      drugSearchTerm: ''
    }
  }

  changeDrugSearchTerm = (event) => {
    event.preventDefault();

    this.setState({
      drugSearchTerm: event.target.value
    });

  }

  render(){

  return (
    <div className="App">
      <div class="container">
      <div class="card">
      <h1>Wiki Drug Search</h1>
      <div id="searchForm" class="input-field">
    <form>
      <input id="searchDrug" class="materialize-textarea" value={this.state.drugSearchTerm || ''} onChange={this.changeDrugSearchTerm} name="search" placeholder="Search By Drug Name" autofocus></input>
      <div class="row">
        <div class="col s12 m4">
          <button id="searchButt" class="btn waves-effect waves-light " type="submit" name="action"><i class="material-icons left">search</i>Submit</button>
        </div>
        <div class="col s12 m4">
          <button id="clear" class="btn waves-effect waves-light "><i class="material-icons left">youtube_searched_for</i>Clear Search</button>
        </div>
        <div class="col s12 m4">
          <button id="searchButt" class="btn waves-effect waves-light " type="submit" name="action"><i class="material-icons left">help_outline</i>Random</button>
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
