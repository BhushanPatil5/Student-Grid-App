import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as studentActions from '../actions/studentFormActions';
import FormInput from './reusable-components/input';
import Button from './reusable-components/button';

// Import the validator.
import SimpleReactValidator from 'simple-react-validator';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormSubmitted: false,
      student: {
        name: '',
        email: '',
        moNo: '',
        schoolName: '',
        std: '',
        div: '',
        state: '',
        country: '',
        id: '',
      }
    };
    this.onSubmit = this.onSubmit.bind(this);

    // Initialize the validator.
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  handleChange = event => {
    event.persist();
    const { student } = this.state;
    if (event._targetInst.elementType === "select") {
      let key = event._targetInst.memoizedProps.id
      student[key] = event.target.value;
    }
    student[event.target.name] = event.target.value;
    this.setState({ student });
  };

  // generate unique id
  uuid() {
    let number = Math.random();
    number.toString(36);
    const id = number.toString(36).substr(2, 9);
    return id
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      // destructuring variable from state
      const { name, email, moNo, schoolName, std, div, state, country, id } = this.state.student

      let uuid = this.uuid();

      let data = { name, email, moNo, schoolName, std, div, state, country, id: uuid }

      this.props.registerStudent(data);

      let baseState = { name: '', email: '', moNo: '', schoolName: '', std: '', div: '', state: '', country: '', id: '', }

      // clear state after submitting form
      this.setState({
        isFormSubmitted: true,
        student: baseState
      })
      this.validator.hideMessages();
    } else {
      this.validator.showMessages();
    }
  }

  render() {
    let { name, email, moNo, schoolName, std, div, state, country } = this.state.student
    return (
      <div class="container-flex p-md-5 p-0">
        <div class="row">
          <div class="col-12">
            <div class="card br-primary-card shadow">
              <div class="card-body p-5">
                <div class="col-12 text-center mb-5">
                  {
                    !this.state.isFormSubmitted
                      ? <h3 class="text-primary aclonica-font"> ADD NEW STUDENT </h3>
                      : <h3 class="text-success aclonica-font"> FORM SUBMITTED SUCCESSFULLY !!! </h3>
                  }
                </div>
                <form>
                  <div class="form-row">
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="Name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={this.handleChange}
                          placeholder="Enter Name..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger">{this.validator.message('name', name, 'required')}</span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="Email Address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={this.handleChange}
                          placeholder="Enter Email..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger"> {this.validator.message('email', email, 'required|email')} </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="Mobile Number"
                          name="moNo"
                          type="number"
                          value={moNo}
                          onChange={this.handleChange}
                          placeholder="Enter Phone Number..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger"> {this.validator.message('phone Number', moNo, 'required|numeric')} </span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="School Name"
                          name="schoolName"
                          type="text"
                          value={schoolName}
                          onChange={this.handleChange}
                          placeholder="Enter School Name..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger"> {this.validator.message('School Name', schoolName, 'required')} </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <label for="std">Standard</label>
                        <select onChange={this.handleChange} value={std} class="form-control" id="std">
                          <option value="">Choose Standard</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <span className="text-danger"> {this.validator.message('Standard', std, 'required')} </span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <label for="div">Division</label>
                        <select onChange={this.handleChange} value={div} class="form-control" id="div">
                          <option value="">Choose Division</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="A">C</option>
                          <option value="A">D</option>
                        </select>
                        <span className="text-danger"> {this.validator.message('Division', div, 'required')} </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="State"
                          name="state"
                          type="text"
                          value={state}
                          onChange={this.handleChange}
                          placeholder="Enter State Name..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger"> {this.validator.message('State', state, 'required')} </span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-2">
                      <div class="form-group">
                        <FormInput
                          label="Country"
                          name="country"
                          type="text"
                          value={country}
                          onChange={this.handleChange}
                          placeholder="Enter Country Name..."
                          required
                          className="form-control"
                        />
                        <span className="text-danger"> {this.validator.message('Country', country, 'required')} </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-row text-right">
                    <div class="col-md-12">
                      <Button
                        type="submit"
                        label="SUBMIT"
                        className="btn btn-primary mt-2 mb-2 shadow"
                        handleClick={(e) => this.onSubmit(e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => {
  return {
    studentRecords: students.studentRecords
  }
}

const mapDispatchToProps = {
  ...studentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
