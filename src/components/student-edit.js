import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Loader from './reusable-components/loader';
import FormInput from './reusable-components/input';
import Button from './reusable-components/button';
import * as studentActions from '../actions/studentFormActions';

// Import the validator.
import SimpleReactValidator from 'simple-react-validator';

class StudentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            },
            isFormUpdate: false,
            loading: true
        };
        this.onUpdate = this.onUpdate.bind(this);

        // Initialize the validator.
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    // update student form
    onUpdate(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.props.updateStudentRecords(this.state.student).then(async () => {
                this.setState({ isFormUpdate: true })
                await this.fetchUpdatedFormsFields();
                this.setState({ isFormUpdate: false })
            })
        } else {
            this.validator.showMessages();
        }
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // getting updated form fields
    async fetchUpdatedFormsFields() {
        this.props.fetchStudentRecord(this.props.match.params.userId)
        await this.sleep(2000);
        this.setState({ student: this.props.studentProfileData, loading: false })
    }

    handleChange = event => {
        event.persist();
        const { student } = this.state;
        if(event._targetInst.elementType === "select") {
          let key = event._targetInst.memoizedProps.id
          student[key] = event.target.value;
        }
        student[event.target.name] = event.target.value;
        this.setState({ student });
    };

    async componentDidMount() {
        await this.fetchUpdatedFormsFields();
    }

    render() {
        let { name, email, moNo, schoolName, std, div, state, country } = this.state.student
        return (
            <div>
                {
                    <div>
                        {
                            this.state.isFormUpdate
                                ? <Loader />
                                : this.state.loading
                                    ? <Loader />
                                    : <div class="container-flex p-md-5 p-0">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card br-primary-card shadow">
                                                    <div class="card-body p-5">
                                                        <div class="col-12 text-center mb-5">
                                                            {
                                                                !this.state.isFormUpdate
                                                                    ? <h3 class="text-primary aclonica-font"> UPDATE STUDENT INFO</h3>
                                                                    : <h3 class="text-success aclonica-font"> FORM UPDATED SUCCESSFULLY !!! </h3>
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
                                                                            <option value="C">C</option>
                                                                            <option value="D">D</option>
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
                                                                            value={state}
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
                                                                        label="UPDATE"
                                                                        className="btn btn-primary mt-2 mb-2 shadow"
                                                                        handleClick={(e) => this.onUpdate(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        }
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = ({ students }) => {
    return {
        studentProfileData: students.studentProfileData
    }
}

const mapDispatchToProps = {
    ...studentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);
