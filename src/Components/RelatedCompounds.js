import React from 'react'
import RelatedDisplayCard from './RelatedDisplayCard'

class RelatedCompounds extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         items: [],
    //         isDoneLoading: false
    //     }
    // }
    render(){
        // let items;
        // let link;

            //THE LOOP IS GOING FASTER THAN THE FETCH, NEED TO WAIT FOR THE PROMISE TO BE FULFILLED

            if(this.props.relatedCompounds.length){
            
           let items = this.props.relatedCompounds.map((compound) => {           
                return <RelatedDisplayCard key={compound.pageid} data={compound}/>
            })

            return(
            
                <div>
                    <div>
                        <div className="card" id="relatedTitle">
                            <h5>Related Compounds:</h5>
                        </div>
                            {items}
                    </div>
                </div>
            )
        } else {
            return null
        }

        
    }

}

export default RelatedCompounds