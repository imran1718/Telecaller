import axios from 'axios';
export default{   
    insertCourse: function(course){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        });
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return new Promise((resolve, reject) => {
            ax
                .post("/course/insert", course, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        }); 
    },
    getAllCourses: function(){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/course/getAll',
            }).then((response) => {                 
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });                    
    },
    deleteCourse: function(courseId){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/course/delete/' + courseId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    },
    getCourse: function(courseId){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/course/get/' + courseId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    }, 
    updateCourse: function(course){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        });
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return new Promise((resolve, reject) => {
            ax
                .post("/course/update", course, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}