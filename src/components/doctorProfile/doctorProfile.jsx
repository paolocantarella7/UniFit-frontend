import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Reviews from '../../components/Reviews_Rating/reviews';
import ReviewWrite from '../../components/Review_write/review_write';
import Rating from 'react-rating';
import './doctorProfile.scss'
import Loading from '../loading/loading';
import {toast} from 'react-toastify';

class DoctorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorDetails: false,
      userid: this.props.match.params.userid,
      notFound: false,
      isShown:false
    }

  }
  
  componentDidMount() {
    let userid = this.state.userid
    // api to getch the doctors details
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/doctor/read/?pk=${userid}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.doctor) 
            this.setState({doctorDetails: data})
          else 
            this.setState({notFound: true})
        }
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userid !== this.props.match.params.userid) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/doctor/read/?pk=${this.props.match.params.userid}`)
        .then(response => response.json())
        .then(data => {
          this.setState({doctorDetails: data, userid: this.props.match.params.userid})
        })
        prevState.userid = this.props.match.params.userid
    }

  }
  setIsShown = (e) => { 
    this.setState({ isShown: e });
  };
  copy  = (id) =>{
    navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_DOMAIN}/doctordetail/${id}`)
    toast.success(`Profile link copied to clipboard`, {
      autoClose: 3000,
      className: "successToast"
    })
  }
  render() {
    if (this.state.notFound) 
      return <Redirect to="/notFound"/>
    var doctor;
    if (this.state.doctorDetails && this.state.doctorDetails.doctor) 
      doctor = this.state.doctorDetails.doctor
    if (doctor) {
      return (
        <section className="profile-single-content mt-2">
          <div className="profileBanner">
            
            <div className="bannerFirstHalf position-relative">
            <div className="d-flex flex-row social_icon_top">
            { doctor[0].website ?
              <div className="social_icon">
              <Link
                    to={'/redirect/'+doctor[0].website}
                    className="socialBtnDoctor"><i className="fa fa-globe"></i></Link>
                    </div>
                    : null}
                    { doctor[0].instagram ?
                    <div className="social_icon">
                <Link
                    to={`/redirect/${doctor[0].instagram}`}
                    className="socialBtnDoctor"><i className="fa fa-instagram"></i></Link>
                    </div>
                    : null}
                    { doctor[0].facebook ?
                    <div className="social_icon">
                <Link
                    to={`/redirect/${doctor[0].facebook}`}
                    className="socialBtnDoctor"><i className="fa fa-facebook"></i></Link>
                    </div>
                    : null}
                    { doctor[0].twitter ?
                    <div className="social_icon">
                <Link
                    to={`/redirect/${doctor[0].twitter}`}
                    className="socialBtnDoctor"><i className="fa fa-twitter"></i></Link>
                    </div>
                    : null}
                    { doctor[0].whatsapp ?
                    <div className="social_icon">
                <button
                    onMouseEnter={() => this.setIsShown(true)}
                    onMouseLeave={() => this.setIsShown(false)}
                    className="socialBtnDoctor"><i className="fa fa-whatsapp"></i>
                    </button>
                    { this.state.isShown ?  
                  <div className="whatsapp">
                  {doctor[0].whatsapp}
                  </div>
                  : null }
                    </div>
                    : null}
                    { doctor[0].youtube ?
                    <div className="social_icon">
                <Link
                    to={`/redirect/${doctor[0].youtube}`}
                    className="socialBtnDoctor"><i className="fa fa-youtube"></i></Link>
                    </div>
                    : null}
                    { doctor[0].linkedin ?
                    <div className="social_icon">
                <Link
                    to={`/redirect/${doctor[0].linkedin}`}
                    className="socialBtnDoctor"><i className="fa fa-linkedin"></i></Link>
                    </div>
                   :null}
                    </div>
              <h2 className="d-flex justify-content-center p-2">Dr. {doctor[0] && doctor[0].first_name
                  ? `${doctor[0].first_name} ${doctor[0] && doctor[0].last_name
                    ? doctor[0].last_name
                    : ''} `
                  : `${this.props.currentUser.username}`}</h2>
              <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={2}
                initialRating={doctor[0].review_avg}
                readonly={true}
                className="rating d-flex justify-content-center p-1"/> 
                <div className="d-flex flex-row-reverse social_icon_top sharebtn">
                <div>
                <button
                    onClick={() =>this.copy(doctor[0].user_id)}
                    className="forth-btn editBtnDoctor">share</button>
                    </div>
                {this.props.currentUser && this.props.match.params.userid === this.props.currentUser.id
                ? <div className="pr-2"><Link
                    to={`/doctorprofile/${doctor[0].user_id}`}
                    className="forth-btn editBtnDoctor">Edit</Link>
                  
                  </div>
                : ''
}              
                    </div>
            </div>
            <div className="bannerSecondHalf d-flex justify-content-center">
              <img
                src={doctor[0].img_url && doctor[0].img_url !== '/img/male.png' && doctor[0].img_url !== '/img/female.png'
                ? doctor[0].img_url
                : `${doctor[0].gender === "Female"
                  ? '/img/female.png'
                  : '/img/male.png'}`}
                alt="profile"/></div>

          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="main-content">
                  <div className="doctor_card pt-1 pb-4 d-flex justify-content-around">
                    <ul>
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                          </span>
                          <span className="d-flex justify-content-start doc_detail">{doctor[0] && doctor[0].highestqualification
                              ? doctor[0].highestqualification
                              : "-"}</span>
                        </div>
                      </li>
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i className="fa fa-suitcase" aria-hidden="true"></i>
                          </span>
                          <span className="d-flex justify-content-start doc_detail">{doctor[0] && doctor[0].overall_exp
                              ? doctor[0].overall_exp > 1
                                ? doctor[0].overall_exp + " years experience"
                                : doctor[0].overall_exp + " year experience"
                              : "-"}</span>
                        </div>
                      </li>
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i className="fa fa-stethoscope " aria-hidden="true"></i>
                          </span>
                          <span className="d-flex justify-content-start doc_detail">

                            {doctor[0] && doctor[0].specialization && doctor[0].specialization.length
                              ? doctor[0]
                                .specialization
                                .map((specialization, index) => (index <= 1
                                  ? <span key={index}>{specialization}{index < doctor[0].specialization.length - 1 && index<1
                                        ? ','
                                        : ''}</span>
                                  : ''))
                              : '-'
}
                          </span>
                        </div>
                      </li>
                    </ul>
                    <ul >
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                              style={{
                              fontSize: "22px"
                            }}></i>
                          </span>
                          <span className="doc_detail">{doctor[0]
                              ? `${doctor[0].city?`${doctor[0].city}${doctor[0].dr_state?`,${doctor[0].dr_state}`:''},${doctor[0].country}`:''}`
                              : `${ "-"}`}</span>
                        </div>
                      </li>
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i
                              className="fa fa-mobile"
                              aria-hidden="true"
                              style={{
                              fontSize: "22px"
                            }}></i>
                          </span>
                          <span className="d-flex justify-content-start doc_detail">{doctor[0] && doctor[0].phone
                              ? doctor[0].phone
                              : "-"}</span>
                        </div>
                      </li>
                      <li>
                        <div className="edu_list">
                          <span className="icons">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                          </span>
                          <span>
                            <span className="d-flex justify-content-start doc_detail text-lowercase">{doctor[0] && doctor[0].email
                                ? doctor[0].email
                                : "-"}</span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">About Dr. {doctor[0] && doctor[0].first_name
                        ? `${doctor[0].first_name} ${doctor[0] && doctor[0].last_name
                          ? doctor[0].last_name
                          : ''} `
                        : `${this.props.currentUser.username}`}</h3>
                    {doctor[0] && doctor[0].description
                      ? <p className="text-justify pt-2 pb-2 mt-3">{doctor[0].description}</p>
                      : <p className="text-justify pt-2 pb-2 mt-3">No Bio Added</p>}

                  </div>
                  <div className="single-content py-2 d-flex-column">
                    <h3 className="d-flex justify-content-start subTitle">Specializations</h3>
                    {doctor[0] && doctor[0].specialization && doctor[0].specialization.length
                      ? <ul className="d-flex pt-2 pb-2 mt-3">{doctor[0].specialization.length
                            ? doctor[0]
                              .specialization
                              .map((data, index) => (
                                <li className="d-flex justify-content-start speciality" key={index}>{data}</li>
                              ))
                            : ''
}</ul>

                      : <ul className="d-flex pt-2 pb-2 mt-3">
                        <li className="d-flex justify-content-start">No Specializations Added</li>
                      </ul>
}
                  </div>
                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">Education</h3>
                    <ul
                      className="d-flex pt-2 pb-2 mt-3 listing"
                      style={{
                      listStyleType: 'none'
                    }}>
                      {this.state.doctorDetails.education && this.state.doctorDetails.education.length
                        ? this
                          .state
                          .doctorDetails
                          .education
                          .map((education, index) => (
                            <li className="d-flex justify-content-between" key={index}>
                              {education.degree}
                              - {education.college}
                            </li>
                          ))

                        : <li className="d-flex justify-content-between w-50">No Education Added</li>}

                    </ul>
                  </div>
                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">Services</h3>
                    <ul className="pt-2 pb-2 mt-3 listing">
                      {doctor[0].services && doctor[0].services.length
                        ? doctor[0]
                          .services
                          .map((value, index) => <li className="d-flex justify-content-start" key={index}>{value}</li>)
                        : <li className="d-flex justify-content-start">No Services Added</li>}
                    </ul>
                  </div>
                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">Membership</h3>
                    <ul className="pt-2 pb-2 mt-3 d-flex listing">
                      {doctor[0].membership && doctor[0].membership.length
                        ? doctor[0]
                          .membership
                          .map((value, index) => <li className="d-flex justify-content-start mb-2" key={index}>{value}</li>)
                        : <li className="d-flex justify-content-start mb-2 ">No Memberships Added</li>}
                    </ul>
                  </div>
                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">Hospitals</h3>
                    <ul className="pt-2 pb-2 mt-3 listing">
                      {this.state.doctorDetails.hospital && this.state.doctorDetails.hospital.length
                        ? this
                          .state
                          .doctorDetails
                          .hospital
                          .map((hospital, index) => <li className=" text-justify" key={index}>{hospital.hospital_name}
                            - {hospital.hospital_address}</li>)
                        : <li
                          className="w-50 text-justify"
                          style={{
                          listStyleType: "none"
                        }}>No Hospital Added</li>}
                    </ul>
                  </div>

                  <div className="single-content py-2">
                    <h3 className="d-flex justify-content-start subTitle">Experience</h3>
                    <ul className="pt-2 pb-2 mt-3 listing">
                      {this.state.doctorDetails.experience && this.state.doctorDetails.experience.length
                        ? this
                          .state
                          .doctorDetails
                          .experience
                          .map((doctor, index) => <ul
                            key={index}
                            className="d-flex listing"
                            style={{
                            listStyleType: "none",
                            padding: "10px 0px"
                          }}>
                            <li className=" text-justify">
                              {doctor.hospital}
                              &nbsp;&nbsp;&nbsp; {doctor.designation}&nbsp;&nbsp;&nbsp; {doctor.fro}
                              - {doctor.to}</li>

                          </ul>)
                        : <li
                          className="w-50 text-justify"
                          style={{
                          listStyleType: "none"
                        }}>No Experience Added</li>}
                    </ul>
                    {/* Compoment to show the rewviews */}
                    <Reviews userId={this.props.match.params.userid}/> {/* Componet to write the reviews */}
                    <ReviewWrite userId={this.props.match.params.userid}/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      )
    } else {
      return <Loading/>
    }
  }
}
export default DoctorDetails;