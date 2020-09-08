import React from 'react'
import RelatedDisplayCard from './RelatedDisplayCard'

class RelatedCompounds extends React.Component{

    render(){

            if(this.props.relatedCompounds.length){
            
           let items = this.props.relatedCompounds.map((compound) => {           
                return <RelatedDisplayCard key={ compound.pageid } data={ compound }/>
            })

            return(
            
                <div>
                    <div>
                        <div className="card" id="relatedTitle">
                            <h5>Related Compounds:</h5>
                        </div>
                            { items }
                    </div>
                </div>
            )
        } else {
            return null
        }

        
    }

}

export default RelatedCompounds