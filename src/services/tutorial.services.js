import http from "../http-common";

class TutorialDataService {

    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorial/${id}`);
    }

    create(data) {
        return http.post("/create", data);
    }
    
    update(id,data) {
        return http.post("/update", data);
    }

    delete(id) {
        return http.post("/delete-tutorial",id);
    }

    deleteAll() {
        return http.get(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`tutorials?title=${title}`);
    }
}

export default new TutorialDataService();