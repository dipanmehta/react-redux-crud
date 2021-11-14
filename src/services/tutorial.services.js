import http from "../http-common";

class TutorialDataService {

    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/create", data);
    }
    
    update(id,data) {
        return http.put("/update", data);
    }

    delete(id) {
        return http.delete("/delete-tutorial",id);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`tutorials?title=${title}`);
    }
}

export default new TutorialDataService();