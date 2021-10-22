<template>
    <div>
    <b-container>
     <b-button variant="outline-primary" href="#" v-b-modal.modal-2>Add Course</b-button>
       
        <b-modal id="modal-2" title="Course" hide-footer>          
            
          <div class="form-row" >
            <div class="form-group">
               <label>Name:</label>
               <b-form-input type="text" class="form-control"
                v-model.trim="$v.course.name.$model" :class="{'is-invalid':$v.course.name.$error, 'is-valid':!$v.course.name.$invalid}"
                placeholder="Enter your Name">
               </b-form-input>
               <div class="valid-feedback">Your Name is valid!</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.course.name.required">Name is required</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Contact:</label>
               <b-form-input  class="form-control" 
               v-model.trim="$v.course.contact.$model" :class="{'is-invalid':$v.course.contact.$error, 'is-valid':!$v.course.contact.$invalid}"  
                placeholder="Enter your contact">                
               </b-form-input>
               <div class="valid-feedback">Your contact is valid!</div>
               <div class="invalid-feedback">
                <span v-if="!$v.course.contact.required">contact is required</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Mail Id:</label>
               <b-form-input 
               v-model.trim="$v.course.email.$model" :class="{'is-invalid':$v.course.email.$error, 'is-valid':!$v.course.email.$invalid}"
                placeholder="Enter your email">
               </b-form-input>
               <div class="valid-feedback">Your email is valid!</div>
               <div class="invalid-feedback">
                <span v-if="!$v.course.email.required">Email is required</span>
                <span v-if="!$v.course.email.isUnique">Enter your proper email</span>
               </div>
            </div><br>
            <div class="form-group">
               <label>Course</label>
               <b-form-select  class="form-control" :options="course1" 
               v-model.trim="$v.course.courses.$model" :class="{'is-invalid':$v.course.courses.$error, 'is-valid':!$v.course.courses.$invalid}"
                 >
              </b-form-select>
               <div class="valid-feedback">Your Course is valid!</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.course.courses.required">Course is required </span>
               </div>
            </div><br>
           
            <div class="text-center">
              <b-button variant="outline-success" @click="putCourse()">Submit</b-button>
              <b-button variant="outline-danger" class="mx-3" @click="resetForm()">Reset</b-button>
            </div>
          </div>
        </b-modal>
    </b-container>
    <div class="mt-5">
    </div>
       <CourseTable />
    </div>
</template>
<script>
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
import CourseService from "../Service/CourseService"
import CourseTable from "./CourseTable.vue"
export default {
 name: "Agent",
     components: {
      CourseTable
       },
    data(){
        return{
             course: {              
                        
              name: "",
              contact: "",              
              email: "",
              courses: "",             
            },  
                 selected: null,
        course1: [
         { value: 'NULL', text: 'Choose', disabled:'true' },
          { value: 'HTML', text: 'HTML' },
          { value: 'CSS', text: 'CSS' },
          { value: 'JavaScript', text: 'JavaScript' },
         
        ]
        }
    },
  validations: {
    course: {    
     
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
        courses: {
       required,
        minLength: minLength(1)
      },
    }
  },
  methods:{
    putCourse: function(){ 
        this.$v.$touch()           
                if(this.$v.$invalid){
                    this.submitstatus = "FAIL"
                }
                else {
                    this.submitstatus = "SUCCESS"          
        return new Promise((resolve, reject) => {
            CourseService.insertCourse(this.course)
                .then(response => {                   
                    // this.course.createdAt ="";                               
                    this.course.name ="";
                    this.course.contact ="";
                    this.course.email ="";
                    this.course.courses ="";  
                    this.course = {   
                              name: null,
                              contact: null,
                              email: null,
                              courses: null,                              
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
      this.course = {     
      
      name: null,
      contact: null,
      email: null,
      courses: null,
      
     };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
    }
}
</script>
