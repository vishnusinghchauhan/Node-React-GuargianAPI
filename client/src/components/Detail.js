import React, { Component } from "react";
import { connect } from 'react-redux';
import { getGuardianDetail } from "../actions/action";



class Detail extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:true
        }
    }
    componentDidMount() {
        if(this.props && this.props.history && this.props.history.location && this.props.history.location.state && this.props.history.location.state.id){
            var id  = this.props.history.location.state.id
            this.props.getGuardianDetail(id);
            setTimeout(() => {  this.setState({loading: false})  },1000)
        }
    }
    goToListPage = () => {
        this.props.history.push({
          pathname: "/"
        });
    }
    render() {
        var guardiansDetail = this.props.guardian &&   this.props.guardian.guardiansDetail;
        console.log("guardiansDetail,guardiansDetail", guardiansDetail)
        return (
             <div className="container">
                <div className="gray-bg p-t-lg ">
                    {guardiansDetail  && !this.state.loading ?
                        <div class="card">
                          <div class="card-header">
                            {guardiansDetail.webTitle}
                          </div>
                          <div class="card-body">
                            <p class="card-text"><b> Id </b> :  {guardiansDetail.id} </p>
                            <h5 class="card-title"><b> Pillar Name</b> : {guardiansDetail.pillarName}</h5>
                            <p class="card-text"><b> Pillar Name</b> :  {guardiansDetail.type} </p>
                            <p class="card-text"><b> Section Id </b> :  {guardiansDetail.sectionId} </p>
                            <p class="card-text"><b> Section Name </b> :  {guardiansDetail.sectionName} </p>
                            <p class="card-text"><b> Publication Date </b> :  {guardiansDetail.webPublicationDate} </p>
                            <p class="card-text"><b> Web Url </b> :  {guardiansDetail.webUrl} </p>
                            <p class="card-text"><b> Api Url </b> :  {guardiansDetail.apiUrl} </p>
                            <p class="card-text"><b> Pillar Id </b> :  {guardiansDetail.pillarId} </p>
                            <p class="card-text"><b> Pillar Name </b> :  {guardiansDetail.pillarName} </p>
                          </div>
                          <div class="card-footer text-muted">
                            <button type="button" className="btn btn-outline-primary" onClick={(e)=> this.goToListPage() } >Go Back</button>
                          </div>
                        </div>
                        :
                        <div align="center">
                            <div className="spinner-border text-center" role="status" >
                              <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
        guardian: state.guardian,
})
const mapDispatchToProps = (dispatch) => ({
    getGuardianDetail: (gaurgianid) => dispatch(getGuardianDetail(gaurgianid))
})
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
