
import React, { Component } from "react";
import { connect } from 'react-redux';
import { createTutorial } from '../actions/tutorials';

class AddTutorial extends Component {
    constructor(props) {
        super(props);

        this.newTutorial = this.newTutorial.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);


        this.state = {

            id: null,
            title: "",
            descripion: "",
            published: false,
            submitted: false

        };
    }

    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({
            descripion: e.target.value
        });
    }

    newTutorial() {
        this.setState({
            id: null,
            title: "",
            descripion: "",
            published: false,
            submitted: false
        });
    }

    saveTutorial() {
        const { title, descripion } = this.state;

        this.props
            .createTutorial(title, descripion)
            .then((data) => {
                this.setState({
                    id: data.id,
                    title: data.title,
                    descripion: data.descripion,
                    published: data.published,

                    submitted: "true"
                });

            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (            
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="card">
                            <form>
                                <div className="submit-form">
                                    {
                                        this.state.submitted ? (
                                            <div>
                                                <h4>you submitted successfully!</h4>
                                                <button className="btn btn-success" onClick={this.newTutorial}>
                                                    Add
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label" htmlFor="title">Title</label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="title"
                                                            required
                                                            value={this.state.title}
                                                            onChange={this.onChangeTitle}
                                                            name="title"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="description"
                                                            required
                                                            value={this.state.descripion}
                                                            onChange={this.onChangeDescription}
                                                            name="descripion"
                                                        />
                                                    </div>
                                                </div>
                                                <button onClick={this.saveTutorial} className="btn btn-success">
                                                    Submit
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }

}

export default connect(null, { createTutorial })(AddTutorial);