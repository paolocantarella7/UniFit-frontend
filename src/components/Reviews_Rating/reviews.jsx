import React from 'react';
import Rating from 'react-rating';
import './reviews.scss'



// Component to fetch list of review of particular doctor
class Reviews extends React.Component {
  state = {
    reviews: []
  }
  componentDidMount() {
    // api to fetch the rewviews od doctor according to doctor ID
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reviews/get/?dr_id=${this.props.userId}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.setState((prevState) => ({
            reviews: prevState
              .reviews
              .concat(data)
          }))
        }
      })
  }
  render() {
    return (
      <div className="App">
        <div>
          <h3 className="d-flex justify-self-start mt-3 subTitle">Ratings & Reviews</h3>
          <div className="mt-3 reviewBox">
            {this.state.reviews && this.state.reviews.length
              ? this
                .state
                .reviews
                .map((value, index) => <div style={{
                  padding: "1px"
                }} key={index}>
                  <div className="p-1">
                    <div className="d-flex justify-content-start p-1">
                      <div className="p-1 nameImg">{value
                          .pt_email
                          .substring(0, 2)}</div>
                      <h5 className="reviewTitle">{value.title}</h5>
                    </div>
                    <div className="justify-content-start mt-1 pl-4">

                      <p className="pl-2 reviewDesp">{value.review}</p>
                      <p className="w-100">
                        <Rating
                          emptySymbol="fa fa-star-o fa-2x"
                          fullSymbol="fa fa-star fa-2x"
                          fractions={2}
                          style={{
                          fontSize: "9px",
                          color: "#5fc1fe"
                        }}
                          className="p-1"
                          initialRating={value.rating}
                          readonly={true}/>
                        ({value.rating})
                      </p>

                    </div>

                  </div>
                </div>)
              : <div>No Reviews Added</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default Reviews