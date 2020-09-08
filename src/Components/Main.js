import React, { Component } from 'react'
import '../App.css';
import ResultDisplayCard from './ResultDisplayCard.js'
import NoResultCard from './NoResultCard.js'
import RelatedCompounds from './RelatedCompounds'

class Main extends Component{

  render(){

    const data = this.props.data

    return(
      <div className="App">
        <div className="container">
          <div className="card">
            <h3>Wiki Drug Search</h3>
              <div id="searchForm" className="input-field">
                <form>    
                  <input id="searchDrug" className="materialize-textarea" 
                    value={ data.drugSearchTerm || '' } 
                    onChange={ this.props.changeDrugSearchTerm } 
                    name="search" placeholder="Search By Drug Name" autoFocus>
                  </input>
                  <div className="row">
                    <div className="col s12 m4">
                      <button id="searchButt" className="btn waves-effect waves-light " onClick={ this.props.searchWiki } type="submit" name="action">
                        <i className="material-icons left">search</i>Submit
                      </button>
                    </div>
                    <div className="col s12 m4">
                      <button id="clear" className="btn waves-effect waves-light ">
                        <i className="material-icons left">youtube_searched_for</i>Clear Search
                      </button>
                    </div>
                    <div className="col s12 m4">
                      <button id="searchButt" className="btn waves-effect waves-light " type="submit" name="action">
                        <i className="material-icons left">help_outline</i>Random
                      </button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
          <div id="output">
            { this.props.data.searchSuccess ? 
              <ResultDisplayCard data={ this.props.data }/>
              : null  
            }
            <NoResultCard 
              searchSuccess={ this.props.data.searchSuccess } 
              pageID={ this.props.data.pageID }
            />
            <RelatedCompounds 
              relatedCompounds={ this.props.data.relatedCompounds } 
              data={ this.props.data } 
              getRelatedImages={ this.props.getRelatedImages }
            />
          </div>
        </div>
      </div>
    )}
  }

export default Main