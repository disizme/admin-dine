import React, {Component} from 'react';
import "./fooditem.css"
import foodimg from "../../../shared/diners/media/fooditem.jpeg"
import lozad from 'lozad'
import placeholdImg from "../../../../assets/img/imgplace.png"

class FoodItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isExpanded: false
        }
    }

    componentDidMount(){
        const observer = lozad();
        observer.observe();
    }

    handleClick(){
        // e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight
        });
    }

    addToPlate(sentFor, id){
        this.props.onUpdate(sentFor, id)
        this.handleClick()
    }

    render(){
        const {name, description, price, id, image} = this.props.food;
        const {isExpanded, height} = this.state;
        const currentHeight= isExpanded ? height:0;
        const currentData = this.props.foodData.find(i => i.id === id)
        // let showData = currentData ? currentData : {note: "", quantity: 0}
        let onPlate = this.props.foodData.find(i => i.id === id)
        return(
             <div className={`each-item ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="mx-2"  
                    // onClick={() => this.handleClick()}
                     >
                {image ? <div className="food-img">
                    <img data-src={image}
                     src={placeholdImg} 
                     onError={(e) => {
                        e.target.onerror = null 
                        e.target.src = placeholdImg}}
                     className="lozad" alt="item"/>
                </div>
                : <div className="mb-1"></div>}
                <div className="food-heading mr-auto">
                    <h5><b>{name}</b></h5>
                   {description ? <div><small className="text-muted">{description}</small>
                    </div> : <br/>}
                    <div className="food-price">
                    <small>AUD$ {price}</small>
                    </div>
                </div>
                </div>
                <div className="food-collapse"style={{height: currentHeight+'px'}} >
                    <div className="food-body" ref='inner'>
                    <div className="text-right ml-2">
                    {onPlate ? <button className="btn-sm btn-danger"
                        onClick={(e) => this.addToPlate("remove", id)}
                    >Remove</button>
                    : <button className="btn-sm brand-component"
                        onClick={(e) => this.addToPlate("add", id)}
                    >Add to Your Plate</button>}
                    </div>
                   
                        {/* <input className="form-control form-control-sm food-note d-inline-block" 
                            type="text" placeholder="Add Note" 
                            value={showData.note}
                            onChange={(e) => this.props.onUpdate(0, id, e)}/>
                        <div className="float-right">
                        <button className="btn-sm brand-component minus-btn"
                        onClick={(e) => this.props.onUpdate(-1, id)}
                        >-</button>
                        <div className="btn-sm d-inline-block food-quantity">{showData.quantity}</div>
                        <button className="btn-sm brand-component plus-btn"
                        onClick={(e) => this.props.onUpdate(1, id, e)}>+</button>
                        </div> */}
                    </div>
                </div>
            </div>);
    }
}

export default FoodItem;