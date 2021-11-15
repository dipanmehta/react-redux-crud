import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    retrieveTutorials, findTutorialByTitle, deleateAllTutorials

} from "../actions/tutorials";


class TutorialList extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);

        this.state = {
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.props.retrieveTutorials();
    }

    refreshData() {
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeAllTutorials() {
        this.props.deleateAllTutorials()
            .then((response) => {
                console.log(response);
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    findByTitle() {
        this.refreshData();
        this.props.findTutorialByTitle(this.state.searchTitle);
    }

    render() {

        const { searchTitle, currentTutorial, currentIndex } = this.state;
        const { tutorials } = this.props;

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={this.onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={this.findByTitle}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6">
                        <div className="card">
                            <h4 className="btn btn-light">Tutorials List</h4>
                            <ul className="list-group">
                                {
                                    tutorials && tutorials.length > 0 &&
                                    tutorials.map((tutorial, index) => (
                                        <li
                                            className={
                                                "list-group-item" +
                                                    (index === currentIndex) ? "active" : ""
                                            }
                                            onClick={() => this.setActiveTutorial(tutorial, index)}
                                        >
                                            {tutorial.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            {
                                currentTutorial ? (
                                    <div>
                                        <h4>Tutorial</h4>
                                        <div>
                                            <label>
                                                <strong>Title:</strong>
                                            </label>{" "}
                                            {currentTutorial.description}
                                        </div>
                                        <div>
                                            <label>
                                                <strong>Status:</strong>
                                            </label>{" "}
                                            {currentTutorial.published ? "published" : "pending"}
                                        </div>
                                        <Link
                                            to={`/tutorials/${currentTutorial.Id}`}
                                            className="btn btn-warning"
                                        >Edit</Link>
                                    </div>

                                ) : (
                                    tutorials && tutorials.length > 0 &&
                                    <div>
                                        <br />
                                        <p>Please click on Tutorial...</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        tutorials: state.tutorials
    };
};

export default connect(mapStateToProps, { retrieveTutorials, findTutorialByTitle, deleateAllTutorials })(TutorialList);