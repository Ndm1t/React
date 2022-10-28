import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row , Label, Col, Modal, ModalBody, ModalHeader, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props)
        this.state ={
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this)

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal()
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }


    render(){
        return(
        <>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"> Subbmit Comment</span></Button>
        <Modal isOpen= {this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Col className="form-group">
                                <Label htmlFor="firstname" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        validators={{
                                        }}
                                        >
                                            <option value= {1}>1</option>
                                            <option value= {2}>2</option>
                                            <option value= {3}>3</option>
                                            <option value= {4}>4</option>
                                            <option value= {5}>5</option>
                                        </Control.select>
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        validators={{
                                            maxLength: maxLength(15),
                                            minLength: minLength(3)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            maxLength: 'Must be 15 charachters or less',
                                            minLength: 'Must be greater than 2 charachters'
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows={6}
                                        />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Col md={{size:3}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Col>

                </LocalForm>
            </ModalBody>
        </Modal>
        
        </>
    
        )
    }


}



    
    function RenderDish({dish}){
        return(
                    <Card className="col-12 col-md-5 m-1">
                        <CardImg width="100%"src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
        )
    }

    function RenderComments({comments, addComment, dishId}){
        const cmnts = comments.map((comment) =>{
            return (
             <div key = {comment.id} >
                <p>{comment.comment}</p>
                <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', {year: "numeric", month:"short", day:"2-digit"}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            )})
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4> 
                {cmnts}
                <CommentForm dishId = {dishId} addComment = {addComment} />
            </div>
        )
    }
    
    const DishCard = (props) =>{
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish)
        {
            return(
            <div className="container">
                <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
                </div>
                <div className="row">
                  <RenderDish dish = {props.dish}/>
                  <RenderComments comments = {props.comments}
                  addComment={props.addComment}
                  dishId ={props.dish.id} />
                </div>
            </div>
        )
        }
        else{
            return(
                <div></div>
            )
        }
    }

export default DishCard 