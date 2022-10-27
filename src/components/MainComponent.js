import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishCard from './DishCard';
import Footer from './FooterComponent';
import {DISHES}  from '../shared/dishes';
import {COMMENTS}  from '../shared/comments';
import {PROMOTIONS}  from '../shared/promotion';
import {LEADERS}  from '../shared/leaders';
import About from './AboutComponent';
import Home from './HomeComponent';
import Contact from './ContactConponent';
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments : COMMENTS,
        promotions : PROMOTIONS,
        leaders : LEADERS
    };
  }



  render() {
    const DishWithId = ({match}) => {
      return(
        <DishCard dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0]} 
          comments = {this.state.comments.filter((com)=> com.dishId === parseInt(match.params.dishId))}
        />
      )
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home dish = {this.state.dishes.filter((dish)=> dish.featured)[0]} 
            promotion = {this.state.promotions.filter((promo)=> promo.featured)[0]}
            leader = {this.state.leaders.filter((lead)=> lead.featured)[0]}
          />} />
          <Route exact path='/menu' component={() => <Menu dishes = {this.state.dishes}/>} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route path='/aboutus' component={() => <About leaders = {this.state.leaders}/> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>  
    );
  }
}

export default Main;