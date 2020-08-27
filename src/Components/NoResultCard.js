import React, { Component } from 'react'

class NoResultCard extends Component {
    
    render(){
        console.log(this.props)
        if(this.props.searchSuccess === true){
            return null
        } else if (this.props.searchSuccess === false) {
            return (
                <div className ="card">
                    <h4>No Results Found</h4>
                    <hr></hr>
                    <p>Please check your spelling and/or try using another search term such as another trade name or chemical name</p>
                </div>
            )
        }
    }
}

export default NoResultCard