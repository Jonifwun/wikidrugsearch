import React, { Component } from 'react'

class DataDisplay extends Component {

    render(){

        const { CASNumber, StdInChI, IUPACname } = this.props.data
        
        if(this.props.data.CASNumber){
            return(
                <div className="card" id="dataDisplay">
                    <ul>
                        <li>
                            <span className="bold">CAS Number</span>: { CASNumber }
                        </li>
                        <li>
                            <span className="bold">StdInChI</span>: { StdInChI }
                        </li>
                        <li>
                            <span className="bold">IUPAC Name</span>: { IUPACname }
                        </li>
                        {/* <li>
                            <span className="bold">IUPHAR ligand</span>: {IUPHARligand}
                        </li> */}
                    </ul>
                </div>
            )
        } else {
            return null
        }
        
    }
}

export default DataDisplay