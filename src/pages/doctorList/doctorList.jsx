import React from 'react';
import ConnectedHeader from '../../components/header/header'
import {Link} from 'react-router-dom'
import Footer from '../../components/footer/footer'
import {AccountConsumer} from '../../providers/accountProvider'
import DoctorListSearch from '../../components/doctorListSearch/doctorListSearch'
import './doctorList.scss'
import Rating from 'react-rating';


// To show the list of dcotors (doctor list page)
class ConnectedDoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      country: [],
      departments: [],
      locationParam: this.props.match.params.location,
      deptParam: this.props.match.params.dept
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let location = this.props && this.props.match && this.props.match.params && this.props.match.params.location !== "all"
      ? this.props.match.params.location
      : ''
    let dept = this.props && this.props.match && this.props.match.params && this.props.match.params.dept !== "all"
      ? this.props.match.params.dept
      : ''

    //  api to fetch the list of doctors according to filters
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/search/?pk=${dept}&&lko=${location}`)
      .then(response => response.json())
      .then(data => {
        if (data) 
          this.setState({doctors: data})
      });
    //  api to fetch countries
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/country/`)
      .then(response => response.json())
      .then(data => {
        this.setState({country: data.country})
      });
    //  api to fetch departments
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/departments/`)
      .then(response => response.json())
      .then(data => {
        this.setState({departments: data.departments})
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.locationParam !== this.props.match.params.location || prevState.deptParam !== this.props.match.params.dept) {
      let location = this.props && this.props.match && this.props.match.params && this.props.match.params.location !== "all"
        ? this.props.match.params.location
        : ''
      let dept = this.props && this.props.match && this.props.match.params && this.props.match.params.dept !== "all"
        ? this.props.match.params.dept
        : ''
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/search/?pk=${dept}&&lko=${location}`)
        .then(response => response.json())
        .then(data => {
          if (data) 
            this.setState({doctors: data})
        });
        prevState.locationParam = this.props.match.params.location
        prevState.deptParam = this.props.match.params.dept
    }

  }
  search = (e) => {
    e.preventDefault();
    let location = !e.target.location.value
      ? 'all'
      : e.target.location.value
    let dept = !e.target.department.value
      ? 'all'
      : e.target.department.value
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/search/?pk=${dept === "all"
        ? ''
        : dept}&&lko=${location === "all"
          ? ''
          : location}`)
      .then(response => response.json())
      .then(data => {
        if (data) 
          this.setState({doctors: data})
      });
    this
      .props
      .history
      .push(`/search/${location}/${dept}`);
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <ConnectedHeader {...this.props}/>
        <DoctorListSearch {...this.props} search={this.search}/>
        <section className="profile-single-content mt-3 doctorListPage">
          <div className="mb-3 d-flex flex-column doc_list_div">
            <div className="d-flex align-items-center">
              <h2 style={{
                margin: "0px"
              }}>Doctors List</h2>
              <span
                className="ml-3"
                style={{
                "backgroundColor": "#00BFFE",
                width: "91px",
                height: "3px"
              }}></span>
            </div>
            <p className="mt-1" style={{
              color: "#222"
            }}>There
              are many variations of passages of Lorem Ipsum available, but the majority have
              suffered</p>
          </div>
          <div className="container-fluid p-0 mx-auto allDoctorList">
            <div className="row p-0 m-0">
              <div className="col-lg-12 p-0 m-0">
                <div className="main-content">
                  {this.state.doctors && this.state.doctors.length
                    ? this
                      .state
                      .doctors
                      .map((doctor, index) => (
                        <Link to={`/doctordetail/${doctor.user_id}`} key={index}>
                          <div className="singleDoctor row m-0 mb-3">
                            <div className="col-sm-12 col-md-3 col-lg-3 mx-auto imgContainer">
                              <img
                                src={doctor.img_url && doctor.img_url !== '/img/male.png' && doctor.img_url !== '/img/female.png'
                                ? doctor.img_url
                                : `${doctor.gender === "Female"
                                  ? '/img/female.png'
                                  : '/img/male.png'}`}
                                height="170"
                                width="170"
                                alt="doctor"/>
                            </div>
                            <div className="prof-text w-100 col-sm-12 col-md-9 col-lg-9">
                              <div
                                className=" docName d-flex justify-content-between align-items-center mb-2">
                                <h4 className="m-0 p-2">Dr. {doctor.first_name
                                    ? `${doctor.first_name} ${doctor.last_name}`
                                    : ``}</h4>
                                <Rating
                                  emptySymbol="fa fa-star-o fa-2x"
                                  fullSymbol="fa fa-star fa-2x"
                                  fractions={2}
                                  readonly={true}
                                  initialRating={doctor.review_avg}
                                  className="rating d-flex justify-content-center p-2"
                                  style={{
                                  color: "#5fc1fe"
                                }}/>
                              </div>
                              <div className="row m-0 p-0">
                                <div className="col-sm-12 col-md-6 col-lg-6 m-0 p-0">
                                  <ul>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i
                                            className="fa fa-graduation-cap"
                                            aria-hidden="true"
                                            style={{
                                            fontSize: "18px"
                                          }}></i>
                                        </li>
                                        <li className="d-flex justify-content-start">{doctor.highestqualification
                                            ? doctor.highestqualification
                                            : "-"}</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i
                                            className="fa fa-user"
                                            aria-hidden="true"
                                            style={{
                                            fontSize: "18px"
                                          }}></i>
                                        </li>
                                        <li className="d-flex justify-content-start">{doctor.overall_exp
                                            ? doctor.overall_exp > 1
                                              ? doctor.overall_exp + " years experience"
                                              : doctor.overall_exp + " year experience"
                                            : "-"}</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i
                                            className="fa fa-stethoscope "
                                            aria-hidden="true"
                                            style={{
                                            fontSize: "18px"
                                          }}></i>
                                        </li>
                                        <li className="d-flex justify-content-start">

                                          {doctor
                                            .specialization
                                            .map((specialization, index) => (index <= 1
                                              ? `${specialization}${index < doctor.specialization.length - 1
                                                ? ','
                                                : ''}`
                                              : ''))
}
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6  m-0 p-0">
                                  <ul>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i
                                            className="fa fa-map-marker"
                                            aria-hidden="true"
                                            style={{
                                            fontSize: "22px"
                                          }}></i>
                                        </li>
                                        <li className="d-flex justify-content-start">{doctor.country
                                            ? `${doctor.country}, ${doctor.city}`
                                            : `${ "-"}`}</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i
                                            className="fa fa-mobile"
                                            aria-hidden="true"
                                            style={{
                                            fontSize: "22px"
                                          }}></i>
                                        </li>
                                        <li className="d-flex justify-content-start">{doctor.phone
                                            ? doctor.phone
                                            : "-"}</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="d-flex align-items-center doctorItem">
                                        <li className="mr-2 p-1 card_icons">
                                          <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </li>
                                        <li className="d-flex justify-content-start text-lowercase">{doctor.email}</li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))

                    : <h1>No Doctors
                    </h1>
}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}
const DoctorList = props => (
  <AccountConsumer>
    {({currentUser, updateAccount}) => (<ConnectedDoctorList
      {...props}
      currentUser={currentUser}
      updateAccount={updateAccount}/>)}
  </AccountConsumer>
)
export default DoctorList;