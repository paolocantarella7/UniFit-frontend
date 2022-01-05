import React from 'react';
import Rating from 'react-rating';
import {toast} from 'react-toastify';
import Loading from '../loading/loading';
import './review_write.scss'


// Component to write rewviews
class ReviewWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: 0,
      review: "",
      email: "",
      loading: false
    }
    this.handleClick = this
      .handleClick
      .bind(this)
    this.onSubmit = this
      .onSubmit
      .bind(this)
  }
  handleClick(value) {
    this.setState({value})
  }
  onSubmit(e) {
    e.preventDefault()
    const {title, value, review, email} = this.state
    this.setState({loading: true, value: 0})
    let data = {
      title: title,
      rating: value,
      review: review,
      pt_email: email
    }
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reviews/patch/?dr_id=${this.props.userId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      } else 
        return response.json();
      }
    ).then(data => {
      if (data) {
        this.setState({
          loading: false,
          title: '',
          value: 0,
          review: '',
          comment: '',
          pt_email: ''
        })
        toast.success(`Please Verify Your Email, To Publish this review, verification link is sent on ${email}`, {
          autoClose: 10000,
          className: "successToast"
        })
      }
    }).catch(error => {})
  }

  render() {
    return (this.state.loading
      ? <React.Fragment><Loading/>
          <form className="p-3 writeReview" onSubmit={this.onSubmit}>
            <h3 className="d-flex justify-self-start mt-2">Write a Review</h3>
            <div className="d-flex flex-column w-50 mt-3">
              <span
                className="d-flex justify-content-start"
                style={{
                fontSize: "18px",
                color: "#222222"
              }}>Title</span>
              <input
                required
                style={{
                padding: "8px",
                fontSize: "13px",
                borderRadius: "5px",
                border: "2px solid #8ed2fc"
              }}
                className="mt-1"
                onChange={e => this.setState({title: e.target.value})}/>
            </div>
            <div className="d-flex flex-column w-50 mt-3">
              <span
                className="d-flex justify-content-start"
                style={{
                fontSize: "18px",
                color: "#222222"
              }}>Email</span>
              <input
                type="email"
                required
                style={{
                padding: "8px",
                fontSize: "13px",
                borderRadius: "5px",
                border: "2px solid #8ed2fc"
              }}
                className="mt-1"
                onChange={e => this.setState({email: e.target.value})}/>
            </div>
            <div className="d-flex mt-4">
              <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
                initialRating={this.state.value}
                onClick={this.handleClick}/>
            </div>
            <div className="d-flex flex-column mt-3 w-50">
              <span
                className="d-flex justify-content-start"
                style={{
                fontSize: "18px",
                color: "#222222"
              }}>Review</span>
              <textarea
                className="mt-1"
                style={{
                padding: "8px",
                fontSize: "13px",
                "resize": "none",
                height: "200px",
                borderRadius: "5px",
                border: "2px solid #8ed2fc"
              }}
                onChange={e => this.setState({review: e.target.value})}></textarea>
            </div>
            <button
              type="submit"
              className="d-flex justify-content-start btn btn-success mt-3"
              style={{
              backgroundColor: "#ff9900",
              borderColor: "#ff9900"
            }}>Submit</button>
          </form>
        </React.Fragment>
      : <form className="p-3 writeReview" onSubmit={this.onSubmit}>
        <h3 className="d-flex justify-self-start mt-2">Write a Review</h3>
        <div className="d-flex flex-column w-50 mt-3">
          <span
            className="d-flex justify-content-start"
            style={{
            fontSize: "18px",
            color: "#222222"
          }}>Title</span>
          <input
            required
            style={{
            padding: "8px",
            fontSize: "13px",
            borderRadius: "5px",
            border: "2px solid #8ed2fc"
          }}
            className="mt-1"
            onChange={e => this.setState({title: e.target.value})}/>
        </div>
        <div className="d-flex flex-column w-50 mt-3">
          <span
            className="d-flex justify-content-start"
            style={{
            fontSize: "18px",
            color: "#222222"
          }}>Email</span>
          <input
            type="email"
            required
            style={{
            padding: "8px",
            fontSize: "13px",
            borderRadius: "5px",
            border: "2px solid #8ed2fc"
          }}
            className="mt-1"
            onChange={e => this.setState({email: e.target.value})}/>
        </div>
        <div className="d-flex mt-4">
          <Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            fractions={2}
            initialRating={this.state.value}
            onClick={this.handleClick}
            style={{
              color: "#5fc1fe"
            }}/>
        </div>
        <div className="d-flex flex-column mt-3 w-50">
          <span
            className="d-flex justify-content-start"
            style={{
            fontSize: "18px",
            color: "#222222"
          }}>Review</span>
          <textarea
            className="mt-1"
            style={{
            padding: "8px",
            fontSize: "13px",
            "resize": "none",
            height: "200px",
            borderRadius: "5px",
            border: "2px solid #8ed2fc"
          }}
            onChange={e => this.setState({review: e.target.value})}></textarea>
        </div>
        <button
          type="submit"
          className="d-flex justify-content-start btn btn-success mt-3"
          style={{
          backgroundColor: "#5fc1fe",
          color:"#fff",
          borderColor: "#5fc1fe"
        }}>Submit</button>
      </form>)
  }
}

export default ReviewWrite