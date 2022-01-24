import React from 'react';
import './footer.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-area mt-0 pt-3">
        <div className="footer-copyright">
          <div className="container ">
            <div className="row" style={{ padding: "10px 0px",borderBottom: "2px solid #56befd",borderTop:"2px solid #56befd"}}>
            <div className="row mx-auto" style={{color:"#222",padding: "6px 0px"}}>Copyright UniFit 2022 © All Rights Reserved</div>

            </div>
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer;