import React,{Component} from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

class DishCard extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const comments = this.props.dish.comments.map((comment) =>{
            return (
             <div key = {comment.id}>
                <p>{comment.comment}</p>
                <p>{comment.author} , {comment.date}</p>
            </div>
            )
        })
        return(
            <div className="row">
            <div className="col-12 col-md-5 m-1"> 
            <Card>
                    <CardImg width="100%"src={this.props.dish.image} alt={this.props.dish.name}/>
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
            </Card>
            </div>  
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments}
                </div>
            </div>
            
        )
    }


}

export default DishCard 