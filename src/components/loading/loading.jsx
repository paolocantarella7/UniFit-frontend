import React from 'react';
import { RingLoader, PacmanLoader } from "react-spinners";
import { css } from "@emotion/core";


const override = css`
  margin: 0 auto
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div style={{backgroundColor:"#a2978638",top:"0px",left:"0px",width:"100%",position:"fixed"}}>
        <div className="sweet-loading" style={{ padding: "300px 259px 324px 259px", position:"absolute",width:"100%",backgroundColor:"#00bffea8" }}>
          <PacmanLoader
            css={override}
            size={150}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      </div>

    )
  }
}
export default Loading;

