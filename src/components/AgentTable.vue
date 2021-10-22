<template>
  <div>
     <b-container>
     
  <b-table-simple hover responsive   class="table table-striped table-bordered pt-2" >
            <b-thead>
                <b-tr>
                    <b-th>Agent Id</b-th>
                    <b-th>Name</b-th>                   
                   <b-th>Action</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                
                <b-tr v-for="a in agents" :key="a.id">
                    <b-td>{{a.agentId}}</b-td>
                     
                    <b-td>{{a.name}}</b-td>
                    
                    <b-td><b-icon icon="trash-fill" @click="deleteAgent(a.agentId)" />&nbsp;&nbsp;
                     <b-icon icon="eye-fill" v-b-modal.pop @click="getAgent(a.agentId)"  ></b-icon>&nbsp;&nbsp;
                     <b-icon icon="pen-fill" v-b-modal.update @click="getAgent(a.agentId)"></b-icon>
                    </b-td>
                </b-tr>           
                   
            </b-tbody>
         </b-table-simple>
</b-container>
<b-container>
<div>
       <b-modal id="pop" title="View Agent" hide-footer>
           <div class="control">
               <b-table-simple >
           
               
                <b-tr>
                     <b-th>Name :</b-th>  
                      <b-td>{{agent.name}}</b-td>
                 </b-tr>
                <b-tr>
                      <b-th>Contact :</b-th> 
                     <b-td>{{agent.contact}}</b-td>
                 </b-tr>
                <b-tr>
                      <b-th>Email-id :</b-th>
                     <b-td>{{agent.email}}</b-td>
                 </b-tr>
                 <b-tr>
                      <b-th>Role :</b-th>
                     <b-td>{{agent.role}}</b-td>
                 </b-tr>                  
                                         
              </b-table-simple>
           </div>          
       </b-modal>
</div>
</b-container>
<b-container>
<b-modal id="update" title="Update Agent" ref="modal" hide-footer> 
          <div class="form-row" >
            <div class="form-group">
               <label>Name:</label>
               <b-form-input type="text" class="form-control"
                v-model="agent.name">
               </b-form-input> 
            </div>              
            <div class="form-group">
               <label>Contact:</label>
               <b-form-input type="number" class="form-control" 
               v-model="agent.contact" 
               >                
               </b-form-input> 
            </div>              
            <div class="form-group">
               <label>Mail Id:</label>
               <b-form-input type="email" 
               v-model="agent.email" 
                >
               </b-form-input>
            </div>               
            <div class="form-group">
               <label>Role</label>
               <b-form-input  class="form-control" 
               v-model="agent.role" 
                 >
               </b-form-input>           
            </div>            
            <div class="text-center pt-3">
               <b-button  size="sm" id="submit"   variant="outline-danger"  @click="updateAgent()">Update</b-button><br>
            </div>
          </div>
        </b-modal>  
</b-container>    
    </div>
    
</template>

<script>
import AgentService from '../Service/AgentService'


export default {
     name: "AgentTable",
     components: {
   
  },
   data(){
        return{
             agent: {  
              agentId: "",
              name:"",               
              contact: "",              
              email:"",
              role:""
              },
              agents:null,
        }
    },
    mounted(){
        this.getAllAgents();
      
    },
    methods:{      
       
       getAllAgents: function(){          
            return new Promise((resolve, reject) => {
                AgentService.getAllAgents()
                .then((response) => {                    
                    this.agents = response.data;                   
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });       
        },
        deleteAgent: function(agentId){
           
            return new Promise((resolve, reject) => {
                AgentService.deleteAgent(agentId)
                .then((response) => {
                     this.agents = response.data; 
                    this.getAllAgents();                                                      
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });      
      },
      getAgent: function(agentId){
           
            return new Promise((resolve, reject) => {
                 AgentService.getAgent(agentId)
                .then((response) => {
                  
                    this.agent = response.data;                      
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });       
        },
        updateAgent: function(){
            return new Promise((resolve, reject) => {
                AgentService.updateAgent(this.agent)
                .then(response => {
                alert ("Agent details updated successfully!!!!!");
                this.agent.name="";
                this.agent.contact="";
                this.agent.email="";
                this.agent.role="";
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
            });
        }
       
    }
    }
</script>

<style>

</style>