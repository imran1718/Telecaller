import axios from 'axios';
export default{   
    insertAgent: function(agent){
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
                .post("/agent/insert", agent, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        }); 
    },
    getAllAgents: function(){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/agent/getAll',
            }).then((response) => {                 
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });                    
    },
    deleteAgent: function(agentId){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/agent/delete/' + agentId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    },
    getAgent: function(agentId){
        var ax = axios.create({
            baseURL: "http://localhost:9093",
        }); 
        return new Promise((resolve, reject) => {
            ax({
                method: 'get',
                url: '/agent/get/' + agentId,
            }).then((response) => {                     
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });             
    }, 
    updateAgent: function(agent){
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
                .post("/agent/update", agent, config)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}