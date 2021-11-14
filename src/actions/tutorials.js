import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    UPDATE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
    DELETE_TUTORIAL

} from './types';

import TutorialDataService from '../services/tutorial.services';

export const createTutorial = (title,description) => async(dispatch) => {
    try {
        const data = {
            "title": title,
            "description": description,
            "published":"false"
        };
        const result = await TutorialDataService.create(data);

        dispatch({type:CREATE_TUTORIAL,payload:result.data});
        return Promise.resolve(result.data);

    } catch(error) {
        return Promise.reject(error);
    }
};

export const retrieveTutorials = () => async(dispatch) => {
    try {

        const result = await TutorialDataService.getAll();
        dispatch({type:RETRIEVE_TUTORIALS,payload:result.data.tutorials});

    } catch(error) {
        console.log(error);
    }
}

export const updateTutorial = (id,data) => async(dispatch) => {
    try {
        const result = await TutorialDataService.update(id,data);
        dispatch({type: UPDATE_TUTORIAL,payload:data});

        return Promise.resolve(result.data);

    } catch(error) {
        return Promise.reject(error);
    }
}

export const deleteTutorial = (id) => async(dispatch) => {

    try {

        await TutorialDataService.delete(id);
        dispatch({type:DELETE_TUTORIAL, payload: {id}});

    } catch(error) {

        console.log(error);
    }

};

export const deleateAllTutorials = () => async(dispatch) => {

    try {
        const res = await TutorialDataService.deleteAll();
        dispatch({type: DELETE_ALL_TUTORIALS, payload:res.data});

        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
}

export const findTutorialByTitle = (title) => async(dispatch) => {
    try {
        const res = await TutorialDataService.findByTitle(title);
        dispatch({type:RETRIEVE_TUTORIALS,payload:res.data});
    } catch(err) {
        console.log(err);
    }
}