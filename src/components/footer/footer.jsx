import React from 'react';
import './footer.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-area mt-0 pt-3">
        <div className="footer-copyright">
          <div className="container">
            <div className="row" style={{ padding: "10px 0px",borderBottom: "2px solid #56befd",borderTop:"2px solid #56befd"}}>
              <div className="col-lg-4 col-md-4" style={{padding:"0px"}}>
                <div style={{ padding: "20px 0px",width: "140px"}}><img src="/assets/images/M-Logo.png" alt="logo"/></div>
                <p style={{ color: "#222", margin: "0px", padding: "5px 0px",fontSize:"15px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse</p>
              </div>
              <div className="col-lg-4 col-md-4">
                <h3 style={{padding:"20px 0px"}}>Follow Us</h3>
                <div><ul style={{display:"flex"}}>
                  <li><i className="fa fa-instagram" aria-hidden="true"></i>
                  </li>
                  <li><i className="fa fa-linkedin" aria-hidden="true"></i>
                  </li>
                  <li><i className="fa fa-facebook" aria-hidden="true"></i>
                  </li>
                  <li><i className="fa fa-twitter" aria-hidden="true"></i>
                  </li>
                </ul></div>
              </div>
              <div className="col-lg-4 col-md-4" style={{padding:"0px"}}>
                <h3 style={{padding:"20px 0px"}}>Contact Info</h3>
                <div><ul style={{color:"#222",fontSize:"15px"}}>
                  <li>123-A, Lorem ipsum consectetur adipiscing elit</li>
                  <li>Phone: +91-xxx xxx xxxx</li>
                  <li>Email:info@medicaltourism.india</li>
                </ul></div>
              </div>
            </div>
            <div className="row" style={{color:"#222",padding: "6px 0px"}}>Copyright© All Right Reserved</div>
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer;