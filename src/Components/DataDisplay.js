import React, { Component } from 'react'

class DataDisplay extends Component {

    render(){
        const { CASNumber, StdInChI, IUPACname, IUPHARligand } = this.props.data

        return(
        <div className="card" id="dataDisplay">
            <ul>
                <li>
                    <span className="bold">CAS Number</span>: {CASNumber}
                </li>
                <li>
                    <span className="bold">StdInChI</span>: {StdInChI}
                </li>
                <li>
                    <span className="bold">IUPAC Name</span>: {IUPACname}
                </li>
                <li>
                    <span className="bold">IUPHAR ligand</span>: {IUPHARligand}
                </li>
            </ul>
        </div>)
    }
}

export default DataDisplay