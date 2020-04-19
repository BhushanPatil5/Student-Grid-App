import React from 'react'
import { connect } from 'react-redux';
import * as studentActions from '../actions/studentFormActions';
import Loader from './reusable-components/loader';

class StudentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {},
      loading: true
    };
  }

  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async componentDidMount() {
    // fetch student records from storage on mount component
    this.props.fetchStudentRecord(this.props.match.params.userId)
    await this.sleep(3000)
    this.setState({ formdata: this.props.studentProfileData, loading: false})
  }


  render() {
    const { name, email, moNo, schoolName, std, div, state, country, id } = this.state.formdata
    return (
      <div>
        {
          this.state.loading
          ? <Loader/>
          :<div class="container-flex">
          <div class="row py-5 px-4">
            <div class="col mx-auto">
              <div class="shadow rounded">
                <div class="px-4 pt-0 pb-4 bg-dark">
                  <div class="media align-items-end profile-header pt-3">
                    <div class="profile mr-3"><img src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail" /><a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a></div>
                    <div class="media-body mb-5 text-white">
                      <h5 class="mt-0 mb-0 aclonica-font"> {name} </h5><p class="small mb-4 aclonica-font"> <i class="fa fa-map-marker mr-2"></i>{schoolName}</p>
                    </div>
                  </div>
                </div>
  
                <div class="bg-light py-4 d-flex justify-content-end">
                  <div class="container">
                    <div class="row">
                      <div class="col mx-auto">
                        <div class="card br-primary-card">
                          <div class="card-body br-card-body shadow">
                            <ul class="list-group">
                              <li class="list-group-item">
                                Name:-
      <span class="aclonica-font ml-md-5">{name}</span>
                              </li>
                              <li class="list-group-item">
                                Email:-
      <span class="aclonica-font ml-md-5">{email}</span>
                              </li>
                              <li class="list-group-item">
                                Mobile No:-
      <span class="aclonica-font ml-md-3">{moNo}</span>
                              </li>
                              <li class="list-group-item">
                                School:-
      <span class="aclonica-font ml-md-5">{schoolName}</span>
                              </li>
                              <li class="list-group-item">
                                Standard:-
      <span class="aclonica-font ml-md-4">{std}</span>
                              </li>
                              <li class="list-group-item">
                                Division:-
      <span class="aclonica-font ml-md-4">{div}</span>
                              </li>
                              <li class="list-group-item">
                                Country:-
      <span class="aclonica-font ml-md-4">{country}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="py-4 px-4">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="mb-0">Recent photos</h5><a href="#" class="btn btn-link text-muted">Show all</a>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 mb-2 pr-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/nicole-honeywill-546848-unsplash_ymprvp.jpg" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 mb-2 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294927/dose-juice-1184444-unsplash_bmbutn.jpg" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 pr-lg-1 mb-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294926/cody-davis-253925-unsplash_hsetv7.jpg" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/tim-foster-734470-unsplash_xqde00.jpg" alt="" class="img-fluid rounded shadow-sm" /></div>
                  </div>
                  <div class="py-4">
                    <h5 class="mb-3">Recent posts</h5>
                    <div class="p-4 bg-light rounded shadow-sm">
                      <p class="font-italic mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                      <ul class="list-inline small text-muted mt-3 mb-0">
                        <li class="list-inline-item"><i class="fa fa-comment-o mr-2"></i>12 Comments</li>
                        <li class="list-inline-item"><i class="fa fa-heart-o mr-2"></i>200 Likes</li>
                      </ul>
                    </div>
                  </div>
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
    studentProfileData: students.studentProfileData
  }
}

const mapDispatchToProps = {
  ...studentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);