import React from 'react';
import './doctorListSearch.scss';
import Select from 'react-select';

// Search componet for doctor list page
class DoctorListSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      country: [],
      departments: []
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    //  api to fetch the list of country
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/country/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          country: data
            .country
            .map((item, index) => ({value: item.Name, label: item.Name}))
        })
      });
    // api to fetch the list of departments
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/departments/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          departments: data
            .departments
            .map((item, index) => ({value: item.Name, label: item.Name}))
        })
      });
  }

  render() {
    return (this.state.departments && this.state.country
      ? <div className="doctorSearch">
          <div className="searchForm">
            <form
              className="w-100 d-flex justify-content-center align-items-center"
              onSubmit={this.props.search}>
              <Select
                className="select_drop"
                name="department"
                options={this.state.departments}
                theme={theme => ({
                ...theme,
                borderRadius: 0,
                fontSize: '14px',
                colors: {
                  ...theme.colors,
                  primary25: 'rgb(0, 191, 254)',
                  primary: 'rgb(0, 191, 254)'
                }
              })}
                placeholder="Select Department"/>
              <Select
                className="select_drop"
                name="location"
                options={this.state.country}
                theme={theme => ({
                ...theme,
                borderRadius: 0,
                fontSize: '14px',
                colors: {
                  ...theme.colors,
                  primary25: 'rgb(0, 191, 254)',
                  primary: 'rgb(0, 191, 254)'
                }
              })}
                placeholder="Select Location"/>
              <button className="searchSubmit">
                FIND DOCTOR</button>
            </form>
          </div>
        </div>
      : '')
  }
}
export default DoctorListSearch;