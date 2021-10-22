<template>
  <div>
    <b-container>
     <b-button variant="outline-primary" href="#" v-b-modal.modal-1>Add Agent</b-button>
        <!--popup start for Agent Register-->
        <b-modal id="modal-1" title="Agent" hide-footer>
           
          <div class="form-row" >
            <div class="form-group">
               <label>Name:</label>
               <b-form-input type="text" class="form-control"
                v-model.trim="$v.agent.name.$model" :class="{'is-invalid':$v.agent.name.$error, 'is-valid':!$v.agent.name.$invalid}"
                placeholder="Enter your Name">
               </b-form-input>
               <div class="valid-feedback">Your Name is valid!</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.agent.name.required">Name is required</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Contact:</label>
               <b-form-input  class="form-control" 
               v-model.trim="$v.agent.contact.$model" :class="{'is-invalid':$v.agent.contact.$error, 'is-valid':!$v.agent.contact.$invalid}"  
                placeholder="Enter your contact">                
               </b-form-input>
               <div class="valid-feedback">Your contact is valid!</div>
               <div class="invalid-feedback">
                <span v-if="!$v.agent.contact.required">contact is required</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Mail Id:</label>
               <b-form-input 
               v-model.trim="$v.agent.email.$model" :class="{'is-invalid':$v.agent.email.$error, 'is-valid':!$v.agent.email.$invalid}"
                placeholder="Enter your email">
               </b-form-input>
               <div class="valid-feedback">Your email is valid!</div>
               <div class="invalid-feedback">
                <span v-if="!$v.agent.email.required">Email is required</span>
                <span v-if="!$v.agent.email.isUnique">Enter your proper email</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Role</label>
               <b-form-input  class="form-control" 
               v-model.trim="$v.agent.role.$model" :class="{'is-invalid':$v.agent.role.$error, 'is-valid':!$v.agent.role.$invalid}"
                 placeholder="Enter your  role">
               </b-form-input>
               <div class="valid-feedback">Your role is valid!</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.agent.role.required">Role is required </span>
               </div>
            </div><br>
            
            <div class="text-center">
              <b-button variant="outline-success" @click="putAgent()">Submit</b-button>
              <b-button variant="outline-danger" class="mx-3" @click="resetForm()">Reset</b-button>
            </div>
          </div>
        </b-modal>
        <!--popup end for Agent Register-->
        <div class="pt-5">
          <AgentTable />
        </div>
    </b-container>
  </div>
</template>

<script>
import AgentService from "../Service/AgentService"
import AgentTable from "./AgentTable.vue"
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";

export default {
 name: "Agent",
     components: {
       AgentTable
       },
    data(){
        return{
             agent: {
              agentId:"",
                         
              name: "",
              contact: "",              
              email: "",
              role: "",             
            },  
        }
    },
  validations: {
    agent: {
     
      name: {
        required,
        minLength: minLength(4)
      },
      contact: {
        required,
        Number,
        minLength: minLength(10),
        maxLength: maxLength(10),
        
      },   
      
      email: {
            required,
            email,
            isUnique (value) {
                if(value === '') return true
                var email_regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return new Promise((resolve) => {
                    setTimeout(() => {
                            resolve(email_regex.test(value))
                    }, 350 + Math.random() * 300)
                })
            }
        },
        role: {
       required,
        minLength: minLength(1)
      },
    }
  },
       mounted(){
       
    },
    methods:{
    putAgent: function(){ 
        this.$v.$touch()           
                if(this.$v.$invalid){
                    this.submitstatus = "FAIL"
                }
                else {
                    this.submitstatus = "SUCCESS"          
        return new Promise((resolve, reject) => {
            AgentService.insertAgent(this.agent)
                .then(response => {
                                                   
                    this.agent.name ="";
                    this.agent.contact ="";
                    this.agent.email ="";
                    this.agent.role ="";  
                    this.agent = {     
                          name: null,
                          contact: null,
                          email: null,
                          role: null,                          
                        };
                        this.$nextTick(() => {
                            this.$v.$reset();
                          });                   
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        }); 
     }
    },
    resetForm() {
      this.agent = {
     
      name: null,
      contact: null,
      email: null,
      role: null,
      
     };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
    }
   
      }
    
    
</script>

<style>

</style>