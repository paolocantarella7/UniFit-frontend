import React from 'react';
import './homesearch.scss';
import Select from 'react-select';

// component to serach doctor in home page
class HomeSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      country: false,
      options: [],
      locations: []
    }
  }
  componentDidMount() {
    this.setState(
      {
        country: this.props.country,
        options: this.props.departments.map((data) => (
          { value: data.Name, label: data.Name }
        )),
        locations: this.props.country.map((data) => (
          { value: data.Name, label: data.Name }
        ))
      }
    )
  }
  searchDoctor = (e) => {
    e.preventDefault()
    this
      .props
      .history
      .push(`/search/${!e.target.location.value
        ? "all"
        : e.target.location.value}/${!e.target.department.value
          ? "all"
          : e.target.department.value}`);
  }
  render() {
    return (
      <div className="search-section">  
        <div className="searchBoxContainer">
          <h1>Find your best doctor with medical tourism</h1>
          <p>Save upto 60% in your surgury without compromising service quality,<br/>
          also get a chance to visit a different country and explore a different culture.
            </p>
          
          <div className="form-group">
            <div className="col-lg-12" style={{
              padding: "0px"
            }}>
              <form className=" w-100" onSubmit={this.searchDoctor}>
                <div className="customSelect">
                  <Select
                    className="dropDown"
                    styles={this.state.customStyles}
                    name="department"
                    options={this.state.options}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'rgb(0, 191, 254)',
                        primary: 'rgb(0, 191, 254)',
                      },
                    })}
                    placeholder="Department" />
                  <Select
                    className="dropDown"
                    styles={this.state.customStyles}
                    name="location"
                    options={this.state.locations}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'rgb(0, 191, 254)',
                        primary: 'rgb(0, 191, 254)',
                      },
                    })
                    }
                    placeholder="Location" />
                </div>
                <button className="searchSubmit">
                  <span style={{ width: "15px",height: "15px",padding: "3px"}}>
                    <img src="img/Find-icon.png" alt="" />
                  </span>
                  <span style={{padding:"3px"}}>
                    Search
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default HomeSearch;
