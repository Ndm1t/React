import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishCard from './DishCard';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import { actions } from 'react-redux-form';
import Contact from './ContactConponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment, fetchDishes} from '../redux/ActionCreators';

const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    comments: state.comments,
    leaders: state.leaders
  }     
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes()
  }
  render() {
    const DishWithId = ({match}) => {
      return(
        <DishCard dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
        />
      )
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />} />
          <Route exact path='/menu' component={() => <Menu dishes = {this.props.dishes}/>} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route path='/aboutus' component={() => <About leaders = {this.props.leaders}/> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>  
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
