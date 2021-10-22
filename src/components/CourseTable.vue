<template>
    <div>
             <b-container>
     
  <b-table-simple hover responsive   class="table table-striped table-bordered pt-2" >
            <b-thead>
                <b-tr>
                    <b-th>Course Id</b-th>
                                                 
                    <b-th>Name</b-th>
                  
                   <b-th>Action</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                
                <b-tr v-for="c in courses" :key="c.id">
                    <b-td>{{c.courseId}}</b-td>
                   
                    <b-td>{{c.name}}</b-td>
                  
                    <b-td><b-icon icon="trash-fill" @click="deleteCourse(c.courseId)" />&nbsp;&nbsp;
                     <b-icon icon="eye-fill" v-b-modal.pop @click="getCourse(c.courseId)"  ></b-icon>&nbsp;&nbsp;
                     <b-icon icon="pen-fill" v-b-modal.update @click="getCourse(c.courseId)"></b-icon>
                    </b-td>
                </b-tr>           
                   
            </b-tbody>
         </b-table-simple>
</b-container>
<b-container>
<div>
       <b-modal id="pop" title="View course" hide-footer>
           <div class="control">
               <b-table-simple >
           
              
                <b-tr>
                     <b-th>Name :</b-th>  
                      <b-td>{{course.name}}</b-td>
                 </b-tr>
                <b-tr>
                      <b-th>Contact :</b-th> 
                     <b-td>{{course.contact}}</b-td>
                 </b-tr>
                <b-tr>
                      <b-th>Email-id :</b-th>
                     <b-td>{{course.email}}</b-td>
                 </b-tr>
                 <b-tr>
                      <b-th>Courses :</b-th>
                     <b-td>{{course.courses}}</b-td>
                 </b-tr>                  
                                         
              </b-table-simple>
           </div>          
       </b-modal>
       <b-container>
<b-modal id="update" title="Update Course" ref="modal" hide-footer> 
          <div class="form-row" >
            <div class="form-group">
               <label>Name:</label>
               <b-form-input type="text" class="form-control"
                v-model="course.name">
               </b-form-input> 
            </div>              
            <div class="form-group">
               <label>Contact:</label>
               <b-form-input type="number" class="form-control" 
               v-model="course.contact" 
               >                
               </b-form-input> 
            </div>              
            <div class="form-group">
               <label>Mail Id:</label>
               <b-form-input type="email" 
               v-model="course.email" 
                >
               </b-form-input>
            </div>               
            <div class="form-group">
               <label>Courses</label>
               <b-form-select  class="form-control" :options="course1" 
               v-model="course.courses" 
                 >
               </b-form-select>           
            </div>
            <div class="text-center pt-3">
               <b-button  size="sm" id="submit"   variant="outline-danger"  @click="updateCourse()">Update</b-button><br>
            </div>
          </div>
        </b-modal>  
</b-container>    
</div>
</b-container>
    </div>
</template>
<script>
import CourseService from '../Service/CourseService'


export default {
     name: "CourseTable",
     components: {
   
  },
   data(){
        return{
             course: {  
              courseId: "",
              name:"",               
              contact: "",
           
              email:"",
              courses:""
              },
                       selected: null,
        course1: [
         { value: 'NULL', text: 'Choose', disabled:'true' },
          { value: 'HTML', text: 'HTML' },
          { value: 'CSS', text: 'CSS' },
          { value: 'JavaScript', text: 'JavaScript' },
         
        ],
              courses:null,
        }
    },
    mounted(){
        this.getAllCourses();
      
    },
    methods:{      
        getId : function(){
           var courseId = localStorage.getItem('courseId')
            this.getcourse(courseId);
        },   
       getAllCourses: function(){          
            return new Promise((resolve, reject) => {
                CourseService.getAllCourses()
                .then((response) => {                    
                    this.courses = response.data;                   
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });       
        },
        deleteCourse: function(courseId){
           
            return new Promise((resolve, reject) => {
                CourseService.deleteCourse(courseId)
                .then((response) => {
                     this.courses = response.data; 
                    this.getAllCourses();                                                      
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });      
      },
      getCourse: function(courseId){
           
            return new Promise((resolve, reject) => {
                 CourseService.getCourse(courseId)
                .then((response) => {
                  
                    this.course = response.data;                      
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                }); 
            });       
        },
        updateCourse: function(){
            return new Promise((resolve, reject) => {
                CourseService.updateCourse(this.course)
                .then(response => {
                alert ("course details updated successfully!!!!!");
                this.course.name="";
                this.course.contact="";
                this.course.email="";
                this.course.courses="";
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