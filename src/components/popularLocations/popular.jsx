import React from 'react';
import './popular.scss';

// Component to list down the countries and departments links in homepage
class Popular extends React.Component {
  render() {
    return (
      <section className="category-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-top d-flex flex-column">
                <div className="d-flex align-items-center">
                  <h2 style={{
                    margin: "0px"
                  }}>{this.props.heading}</h2>
                  <span
                    className="ml-3"
                    style={{
                      "backgroundColor": "#00BFFE",
                      width: "91px",
                      height: "3px"
                    }}></span>
                </div>
                <p
                  className="mt-1"
                  style={{
                    color: "#222"
                  }}>There
                    are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered</p>
              </div>
            </div>
          </div>
          <div className="row popular_css">
            {this
              .props
              .list
              .map((data, index) => <div
                className="col-lg-3 col-md-6 mb-4"
                key={index}
                onClick={() => {
                  this
                    .props
                    .history
                    .push(`/search/${this.props.searchField === 'location'
                      ? data.Name
                      : 'all'}/${this.props.searchField === 'department'
                        ? data.Name
                        : 'all'}`);
                }}>
                <div className="draw keep">
                  <div className="text-center popularComp" key={data.id}>
                    <div
                      className="anime"><img src={data.ImageURL} alt="category" className="w-100" /></div>
                    <p className="country_title">{data.Name}</p>
                  </div>
                </div>
              </div>)
            }
          </div>
        </div>
      </section>
    )
  }
}
export default Popular;