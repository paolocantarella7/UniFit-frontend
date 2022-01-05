import React from 'react';
import './doctors.scss';

// Component to list down the countries and departments links in homepage
class Latest extends React.Component {
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
                    .push(`/doctordetail/${data.user_id}`);
                }}>
                <div className="draw keep">
                  <div className="text-center popularComp" key={data.id}>
                    <div
                      className="anime"><img
                      src={data.img_url && data.img_url !== '/img/male.png' && data.img_url !== '/img/female.png'
                      ? data.img_url
                      : `${data.gender === "Female"
                        ? '/img/female.png'
                        : '/img/male.png'}`}
                      height="170"
                      width="170"
                      alt="doctor" /></div>
                    <p className="country_title">Dr. {data.first_name}&nbsp;&nbsp;{data.last_name} </p>
                    <p className="country_sub_title" >{data
                                            .specialization
                                            .map((specialization, index) => (index <= 1
                                              ? `${specialization}${index < data.specialization.length - 1
                                                ? ','
                                                : ''}`
                                              : ''))
                    }</p>
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
export default Latest;