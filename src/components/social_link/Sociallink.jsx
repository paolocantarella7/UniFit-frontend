import React from 'react';

class SocialLink extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: this.props.match.params.url,
      }
      
    }
    render()
    {
        
        window.location.href = 'http://'+this.state.url;
        return null;
    
    }
}
export default SocialLink;