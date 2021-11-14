import { Button } from "bootstrap";
import React,{ Component } from "react";
import { connect } from "react-redux";
import {updateTutorial,deleteTutorial} from "../actions/tutorials";
import TutorialDataService from "../services/tutorial.services";


class Tutorial extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateConent.bind(this);
        this.state = {
            currentTutorial: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title
                }
            }
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description
            }
        }));
    }

    getTutorial(id) {
        TutorialDataService.get(id)
        .then((response) =>{
            this.setState({
                currentTutorial: response.data
            });
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    updateStaus(status) {

        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };

        this.props.updateTutorial(data.id,data)
        .then(response => {
            console.log(response);

            this.setState((prevState) => ({
                currentTutorial: {
                    ...prevState.currentTutorial,
                    published:status
                }
            }));

            this.setState({message: "This status was updated successfully!"});
        })
    }

    updateConent() {
        this.props.updateTutorial(this.state.currentTutorial.id,this.state.currentTutorial)
        .then((response) => {
            console.log(response);
            this.setState({message: "The tutorial was updated successfully"});
        })
        .catch((e) => {
            console.log(e);
        })
    }

    removeTutorial() {
        this.props.deleteTutorial(this.state.currentTutorial.id)
        .then(() => {
            this.props.history.push("/tutorials");
        })
        .catch((e) => {
            console.log(e);
        })
    }

    render() {

        const { currentTutorial } = this.state;
        return (
            <div>
                {
                    currentTutorial ? (
                        <div className="edit-form">
                            <h4>Tutorial</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={currentTutorial.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripion</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={currentTutorial.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <strong>Status:</strong>
                                    </label>
                                    {currentTutorial.published ? "published" : "pending"}
                                </div>
                            </form>

                            {currentTutorial.published ? (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updateStatus(false)}
                                >
                                    Unpublish
                                </button>

                            ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updateStatus(true)}
                                >
                                    Publish
                                </button>

                            )}
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.removeTutorial}
                            >
                                Delete
                            </button>

                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateConent}
                            >
                                Update
                            </button>
                            <p>{this.state.message}</p>

                        </div>

                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial</p>
                        </div>
                    )
                }
            </div>
        );
    }

}

export default connect(null,{updateTutorial,deleteTutorial})(Tutorial);