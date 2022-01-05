import React from 'react';
import './addServicesSpec.scss'

//  Modal to add the fields of doctor profiles
class AddServicesSpec extends React.Component {
  render() {
    return (
      <div
        className="modal fade addModal"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h4>
              <button
                type="button"
                className={`close ${this.props.id}`}
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.isSpec
                ? <div className="form-select" id="default-select">
                  <select
                    name={this.props.name}
                    className="profileSelect add_select"
                    value={this.props.value}
                    onChange={this.props.handleChange}
                  >
                  {
                    this.props.departments.map((dept,index)=>(
                      <option value={dept.Name} key={index}>{dept.Name}</option>
                    ))
                  }
                  </select>
                </div>
                : ''
              }{this.props.isMembership
                ? <input
                  type="text"
                  name={this.props.name}
                  placeholder="Enter Membership"
                  maxLength="30"
                  value={this.props.value}
                  onChange={this.props.handleChange}
                  className="w-100 service_input" />
                : ''
              }{this.props.isService
                ? <input
                  type="text"
                  name={this.props.name}
                  placeholder="Enter service"
                  value={this.props.value}
                  maxLength="30"
                  onChange={this.props.handleChange}
                  className="w-100 service_input" />
                : ''
              } {this.props.isEduc
                ? <div className="education">
                  <div className="fieldsGroup d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-user labelIcon" aria-hidden="true"></i>
                      <span className="label">Course</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.courseName}
                        placeholder="Enter Course Name"
                        maxLength="30"
                        value={this.props.course}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup mt-2 d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-graduation-cap labelIcon" aria-hidden="true"></i>
                      <span className="label">School</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.schoolName}
                        maxLength="30"
                        placeholder="Enter School/College Name"
                        value={this.props.school}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup mt-2 d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-calendar labelIcon" aria-hidden="true"></i>
                      <span className="label">Completion Date</span>
                    </div>
                    <div className="field">
                      <input
                        type="date"
                        name={this.props.dateName}
                        placeholder="Enter Completion Date"
                        value={this.props.date}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                </div>
                : ''
              }{this.props.isExp
                ? <div className="education">
                  <div className="fieldsGroup d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-building-o labelIcon" aria-hidden="true"></i>
                      <span className="label">Organization</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.orgName}
                        placeholder="Enter Organization Name"
                        value={this.props.org}
                        maxLength="30"
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup d-flex mt-2 align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-cogs labelIcon" aria-hidden="true"></i>
                      <span className="label">Designation</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.degName}
                        placeholder="Enter Designation"
                        value={this.props.deg}
                        maxLength="30"
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup mt-2 d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-calendar labelIcon" aria-hidden="true"></i>
                      <span className="label">From</span>
                    </div>
                    <div className="field">
                      <input
                        type="date"
                        name={this.props.fromName}
                        value={this.props.from}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup mt-2 d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-calendar labelIcon" aria-hidden="true"></i>
                      <span className="label">To</span>
                    </div>
                    <div className="field">
                      <input
                        type="date"
                        name={this.props.toName}
                        value={this.props.to}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                </div>
                : ''
              } {this.props.isHos
                ? <div className="education">
                  <div className="fieldsGroup d-flex align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-building-o labelIcon" aria-hidden="true"></i>
                      <span className="label">Hospital Name</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.hosName}
                        placeholder="Enter Hospital Name"
                        value={this.props.hname}
                        maxLength="30"
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                  <div className="fieldsGroup d-flex mt-2 align-items-center flex-wrap">
                    <div className="inputLabel">
                      <i className="fa fa-address-card-o labelIcon" aria-hidden="true"></i>
                      <span className="label">Address</span>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name={this.props.hosAddress}
                        maxLength="50"
                        placeholder="Enter Hospital Address"
                        value={this.props.haddress}
                        onChange={this.props.handleChange}
                        className="single-input" />
                    </div>
                  </div>
                </div>

                : ''
              }

              <div className="edit_errordiv">
                {this.props.showError
                  ? <p className="edit_errmsg">{this.props.errMsg}</p>
                  : ""
                }
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="genric-btn primary radius small addBtnModal"
                onClick={this.props.addData}>Add</button>
              <button
                type="button"
                className="genric-btn danger-border radius small"
                data-dismiss="modal">Cancel</button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AddServicesSpec;