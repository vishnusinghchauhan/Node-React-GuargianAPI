import React, { Component } from "react";
import { connect } from 'react-redux';
import { getGuardianList, getGuardianSearchList, gerGuardianByDate } from "../actions/action";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectValue:'select',
          searchValue :'',
          pageIndex : 1,
          loading: true,
        }
        this.showMoreDetails = this.showMoreDetails.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadPagonateData = this.loadPagonateData.bind(this);
        this.loadPreviousData = this.loadPreviousData.bind(this);
        this.loadNextData = this.loadNextData.bind(this);
    }
    componentDidMount() {
        this.props.getGuardianList(this.state.pageIndex)
        setTimeout(() => {  this.setState({loading: false})  },1000)
    }
    handleChange = (e) => {
      this.setState({selectValue:e.target.value});
      this.props.gerGuardianByDate(e.target.value);
    }
    loadPagonateData = (pageIndex) => {
      this.setState({pageIndex: pageIndex}, function(){
          this.props.getGuardianList(pageIndex);
      })
    }
    loadPreviousData = () => {
      this.setState({pageIndex: this.state.pageIndex-1}, function(){
          this.props.getGuardianList(this.state.pageIndex);
      })
    }
    loadNextData = () => {
      this.setState({pageIndex: this.state.pageIndex+1}, function(){
          this.props.getGuardianList(this.state.pageIndex);
      })
    }
    showMoreDetails = (id) => {
        this.props.history.push({
          pathname: "/view-detail",
          state: {  id: id  }
        });
    }
    handleKeyUp = (e) => {
      let value = e.target.value
      this.setState({searchValue: value})
      if(value.length > 0){
        if(e.keyCode == 8 || e.keyCode ==13){
          this.props.getGuardianList(this.state.pageIndex).then((res)=>{
            this.props.getGuardianSearchList(value)
          });
        }else{
          this.props.getGuardianSearchList(value)
        }
      }else if(value.length == 0){
        this.props.getGuardianList(this.state.pageIndex);
      }
       
    }
    render() {
         var guardianlist = this.props.guardian && this.props.guardian.guardiansList;
        console.log("guardianlist,guardianlist", guardianlist)
            return (
                <div className="container">
                    <div className="gray-bg p-t-lg ">

                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="form-group">
                             <label for="usr">Search:</label>
                             <input type="text" className="form-control"  onKeyUp={this.handleKeyUp} />
                            </div>
                        </div>
                      <div className="col-sm-12 col-md-6">
                      <div className="form-group">
                            <label for="sel1">Sort By:</label>
                              <select  className="form-control" value={this.state.selectValue}  onChange={this.handleChange} >
                                <option value="Select">Select</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                              </select>
                            </div>
                      </div>
                    </div>
                   


         		     {guardianlist.length > 0  && !this.state.loading
                      ?    
                        <div className="row">
                           {guardianlist && guardianlist.length > 0 && guardianlist.map((data, index) => (
                                <div key={index} className="col-md-12 col-sx-12">
                                    <div className="card mb-3">  
                                        <div className="card-header bg-transparent"><b> {data.webTitle}</b>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text"><b> Web Title </b> : {data.webUrl}</p>
                                        <p className="card-text"><b> Pillar Name </b> :{data.pillarName}</p>
                                        <p className="card-text"><b> Section Name </b> : {data.sectionName}</p>
                                        <p className="card-text"><b> Publication Date </b> :{data.webPublicationDate}</p>
                                   </div>
                                    <div className="card-footer bg-transparent " align="right">
                                        <button type="button" className="btn btn-outline-primary" onClick={(e)=> this.showMoreDetails(data.id) } >View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                      :
                        this.state.searchValue.length > 0 && guardianlist.length == 0 ?
                        <div align="center">
                            <h6>No search results found</h6>
                        </div>
                        :
                        <div align="center">
                            <div className="spinner-border text-center" role="status" >
                              <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        
                    }
                  {guardianlist.length > 0 &&
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        <li className="page-item ">
                          <a className="page-link" onClick={(e) => (this.loadPreviousData())}  tabIndex="-1">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" onClick={(e) => (this.loadPagonateData(1))} >1</a></li>
                        <li className="page-item"><a className="page-link" onClick={(e) => (this.loadPagonateData(2))} >2</a></li>
                        <li className="page-item"><a className="page-link" onClick={(e) => (this.loadPagonateData(3))} >3</a></li>
                        <li className="page-item"><a className="page-link" onClick={(e) => (this.loadPagonateData(4))} >4</a></li>
                        <li className="page-item">
                          <a className="page-link" onClick={(e) => (this.loadNextData())} >Next</a>
                        </li>
                      </ul>
                    </nav>
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
    getGuardianList: (pageIndex) => dispatch(getGuardianList(pageIndex)),
    getGuardianSearchList: (searchValue) => dispatch(getGuardianSearchList(searchValue)),
    gerGuardianByDate: (filterType) => dispatch(gerGuardianByDate(filterType)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
