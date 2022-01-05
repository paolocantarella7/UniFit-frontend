import React from 'react';
import {Link} from 'react-router-dom';
import './register.scss'

// Register section component of home page
class Register extends React.Component {
    render() {
        return (
            <div className="register_comp">
                <div style={{ width: "80%", margin: "0 auto" }} className="d-flex justify-content-between registerWrap">
                    <div className="d-flex flex-column" style={{ padding: "50px 0px" }}>
                        <h2 style={{ padding: "10px 0px", margin: "0px",color: "#FFFFFF" }}>Are you a passionate doctor and can provide world class services ?</h2>
                        <span style={{ backgroundColor: "#FFF", height: "3px" }}></span>
                        <p className="m-0" style={{ maxWidth: "596px", padding: "15px 0",  color: "#FFFFFF" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered Lorem Ipsum</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center" >
                        <button className="btn btn-primary register_btn">
                            <div className="d-flex justify-content-center align-content-center">
                                <span className="p-1"><img style={{width:"20px",height:"20px"}}src="/img/register-icon.png" alt="register"/></span>
                                <span className="p-1"><Link to="/signup" className="register ml-1">Register Now</Link></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register