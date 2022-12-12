import React, { Component } from "react";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import DishCard from "./DishCard";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import Home from "./HomeComponent";
import { actions } from "react-redux-form";
import Contact from "./ContactConponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchComments,
  fetchDishes,
  postFeedback,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    comments: state.comments,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
  postFeedback: (
    firstName,
    lastName,
    contactTel,
    email,
    agree,
    contactType,
    message
  ) => {
    dispatch(
      postFeedback(
        firstName,
        lastName,
        contactTel,
        email,
        agree,
        contactType,
        message
      )
    );
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  render() {
    console.log("this.props", this.props);
    const DishWithId = ({ match }) => {
      return (
        <DishCard
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };
    return (
      <div>
        <Header />
        {/* <TransitionGroup>
          <CSSTransition
            nodeRef={this.props.location.key}
            classNames="page"
            timeout={30}
          > */}
        <Switch ref={this.props.location}>
          <Route
            path="/home"
            component={() => (
              <Home
                dish={
                  this.props.dishes.dishes.filter((dish) => dish.featured)[0]
                }
                dishesLoading={this.props.dishes.isLoading}
                dishErrMess={this.props.dishes.errMess}
                promotion={
                  this.props.promotions.promotions.filter(
                    (promo) => promo.featured
                  )[0]
                }
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={
                  this.props.leaders.leaders.filter(
                    (leader) => leader.featured
                  )[0]
                }
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
              />
            )}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact
                resetFeedbackForm={this.props.resetFeedbackForm}
                postFeedback={this.props.postFeedback}
              />
            )}
          />
          <Route
            path="/aboutus"
            component={() => (
              <About
                leaders={this.props.leaders.leaders}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        {/* </CSSTransition>
        </TransitionGroup> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
