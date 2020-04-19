import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Loader from './reusable-components/loader';
import * as studentActions from '../actions/studentFormActions';

class StudentGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentRecords: [],
            filterBy:"",
            loading: true
        };
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async componentDidMount() {
        this.props.setStudentRecords();
        await this.sleep(3000)
        this.setState({ studentRecords: this.props.studentRecords, loading: false })
    }

    dynamicSort(property) {
        let sortOrder = 1;
        return function (a,b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    handleFilterByChange(e) {
        this.setState({filterBy: e.target.value});
        let studentRecords = this.state.studentRecords
        let sortedRecords =  studentRecords.sort(this.dynamicSort(e.target.value));
        this.setState({studentRecords: sortedRecords});
    }

    render() {
        return (
            <div>
                {
                    this.state.loading
                    ? <Loader/>
                    : <div className="container-flex p-md-5 p-0">
                    <div className="card br-primary-card">
                        <div className="card-body br-card-body shadow">
                            <div className="row">
                                <div className="col-md-3 mb-3 text-center text-md-left p-0">
                                    <Link to="/student-form">
                                        <button className="btn btn-primary shadow" type="button">
                                            ADD NEW STUDENT
                                            </button>
                                    </Link>
                                </div>
                                <div className="col-md-9 mb-3 text-center text-md-left p-0">
                                    <div class="selectdiv">
                                        <label className="label">
                                            <select onChange={this.handleFilterByChange} value={this.state.filterBy}>
                                                <option value="">Choose Value</option>
                                                <option value="schoolName">School Name</option>
                                                <option value="std">Standard</option>
                                                <option value="div">Division</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="table-responsive ">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th className="text-center">ID</th>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">Standard</th>
                                                <th className="text-center">Division</th>
                                                <th className="text-center">School</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.studentRecords.map((item, i) => {
                                                return (
                                                    <React.Fragment>
                                                        <tr key={i}>
                                                            <th className="text-center">{item.id}</th>
                                                            <th className="text-center">{item.name}</th>
                                                            <th className="text-center">{item.std}</th>
                                                            <th className="text-center">{item.div}</th>
                                                            <th className="text-center">{item.schoolName}</th>
                                                            <td className="text-center"><Link to={`/student-edit/${item.id}`} className="btn btn-light shadow-sm btn-xs m-1">Edit</Link> <Link to={`/student-details/${item.id}`} className="btn btn-light btn-xs m-1 shadow-sm">View Details</Link> </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentGrid);