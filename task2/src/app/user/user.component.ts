import { Component, OnInit ,Input} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { FormGroup,  FormBuilder,  Validators ,NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import { SimpleChanges } from '@angular/core';
import {FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  // pipes: [FilterPipe]
})
export class UserComponent implements OnInit {
  appParentMessage = "siva";

  // @Input() Editusers: string;


  ngOnChanges(changes: SimpleChanges) {
     console.log("==========",changes)
    // if(changes.userObj){
      // console.log('input changed',this.userObj);
      this.fetchData();
    // }
  }


  constructor(private http: Http,private router: Router ,private formBuilder: FormBuilder ) {
  }
  users = [];
  userForm: FormGroup;
  submitted = false;
  isAdded: boolean = false;
  userObj: object = {};
  title = "Add New User"
  updateBtn = "Create New User"
  createBtn = "Create New User"
  function_name = "addNewUser()"
  create_form = "addNewUser()"
  firstname=""
  lastname=""
  email=""
  phone =""
  id=""
  val:boolean=false;

  get fval() { 
  	return this.userForm.controls; 
  }

  EditUserInfo(user: any){
    console.log(user, "DATA")
    this.firstname = user.user.fname;
    this.lastname = user.user.lname;
    this.email = user.user.email;
    this.phone = user.user.phone;
    this.title = "Edit User";
    this.updateBtn = "Edit User"
    this.id = user.user.id
    this.function_name = "updateUser()"
  }
  

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone:['', Validators.required]
    })
    this.fetchData();
    this.appParentMessage;
  }


  addNewUser(){
   	
    this.submitted = true;
    
    if(this.userForm.invalid){
      this.val=true;
      console.log('failed')
      return;
	  }else{
      this.val=false;
      console.log('success')
      
      this.userObj = {
        "fname": this.userForm.controls['fname'].value,
        "lname": this.userForm.controls['lname'].value,
        "email": this.userForm.controls['email'].value,
        "phone": this.userForm.controls['phone'].value
      }
      console.log("==========",this.userObj)
      this.http.post("http://10.90.90.117:5555/users/", this.userObj).subscribe((res: Response)=>{
        console.log(res);
        this.fetchData();
        this.isAdded = true;
      })
    }

    if (this.userForm.valid) {
      console.log("Form Submitted!");
      this.userForm.reset();
    }
  }

  fetchData = function(){
  	this.http.get("http://10.90.90.117:5555/users").subscribe(
  		(res: Response) => {
  			this.users = res.json();
        console.log(this.users)

  		}
  	)

  }

  deleteUser = function(id){
  	if(confirm('Are you sure?')){
  		const url = `${"http://10.90.90.117:5555/users"}/${id}`;
  		return this.http.delete(url, {headers: this.headers}).toPromise().then(() => {
  			this.fetchData();
        
  		})
  	}
  }

  EditUser = function(user,id){
    console.log("sssssssssssss",user,id);
    this.firstname = user.fname;
    this.lastname = user.lname;
    this.email = user.email;
    this.phone = user.phone;
    this.title = "Edit User";
    this.updateBtn = "Edit User"
    this.id = user.id
    this.function_name = "updateUser()"
      
    const url = "http://10.90.90.117:5555/users?id="+this.id;
      console.log(url)
      
      this.http.get(url).subscribe(res=>{
        console.log(res, "fffffffff")

      })
  }

  testing(){
    console.log("+++++++++++++++++")
    this.createBtn = "Create User"
    this.create_form = "addNewUser()"
    this.title = "Create New User";
    this.userForm.reset();
  }

  updateUser= function(){
   
    var data = {
      fname: this.firstname,
      lname: this.lastname,
      email: this.email,
      phone: this.phone
    }
    const url = "http://10.90.90.117:5555/users/"+this.id;
    console.log(url)
    this.http.patch(url, data).subscribe((err, res)=> {
      this.fetchData();
      this.userForm.reset();
    })
  }
}