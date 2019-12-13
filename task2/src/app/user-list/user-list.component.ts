import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { SimpleChanges } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators ,NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {FilterPipe} from '../filter.pipe';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private http: Http,private router: Router ,private formBuilder: FormBuilder ) {
  }

  users = [];
  data = [];
  @Input() userObj: object = {};
  @Input() Appusers: [] = [];
  @Output() user_data = new EventEmitter();

    // @Input () model: any;
   ngOnChanges(changes: SimpleChanges) {
     console.log("==========",changes)
    // if(changes.userObj){
      // console.log('input changed',this.userObj);
      this.fetchData();
      
    // }
  }
  
  // userObj: object = {};

  // @Input() appChildMessage: string;
  
  ngOnInit() {
  	this.fetchData();
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
    console.log("edit user details",user,id);
    this.firstname = user.fname;
    this.lastname = user.lname;
    this.email = user.email;
    this.phone = user.phone;
    this.title = "Edit User";
    this.updateBtn = "Edit User"
    this.id = user.id
    this.function_name = "updateUser()"
      
    const url = "http://10.90.90.117:5555/users/"+this.id;
      console.log(url)
      
      this.http.get(url).subscribe(res=>{
        var result = res.json();
        console.log(result, "fffffffff")
        this.data.push(result);
        console.log(this.data, "000000")
        this.user_data.emit({user: result});
      })
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

  fetchData = function(){
  	this.http.get("http://10.90.90.117:5555/users").subscribe(
  		(res: Response) => {
  			this.users = res.json();
        console.log("==================",this.users)

  		}
  	)

  }
}