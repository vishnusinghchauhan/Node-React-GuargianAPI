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
            setTimeout(() => {  this.setState({loading: false})  },1500)
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
                        <div className="card">
                          <div className="card-header">
                            {guardiansDetail.webTitle}
                          </div>
                          <div className="card-body">
                            <p className="card-text"><b> Id </b> :  {guardiansDetail.id} </p>
                            <h5 className="card-title"><b> Pillar Name</b> : {guardiansDetail.pillarName}</h5>
                            <p className="card-text"><b> Pillar Name</b> :  {guardiansDetail.type} </p>
                            <p className="card-text"><b> Section Id </b> :  {guardiansDetail.sectionId} </p>
                            <p className="card-text"><b> Section Name </b> :  {guardiansDetail.sectionName} </p>
                            <p className="card-text"><b> Publication Date </b> :  {guardiansDetail.webPublicationDate} </p>
                            <p className="card-text"><b> Web Url </b> :  {guardiansDetail.webUrl} </p>
                            <p className="card-text"><b> Api Url </b> :  {guardiansDetail.apiUrl} </p>
                            <p className="card-text"><b> Pillar Id </b> :  {guardiansDetail.pillarId} </p>
                            <p className="card-text"><b> Pillar Name </b> :  {guardiansDetail.pillarName} </p>
                          </div>
                          <div className="card-footer text-muted">
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
