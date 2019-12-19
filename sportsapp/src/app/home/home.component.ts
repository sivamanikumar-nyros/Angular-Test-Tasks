import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams:any = [];
  teamform: FormGroup

  name:string;
  sport: string;
  submitted = false;
  delete_id = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.teamform = this.formBuilder.group({
      name: ['', Validators.required],
      sport: ['', Validators.required]
    })
    this.getTeams();
  }

  createBtn(){
    this.submitted = false;
  }

  get f() { return this.teamform.controls; }

  createTeam(){

    this.submitted = true;
    if (this.teamform.invalid) {
      console.log(this.teamform.controls)
      return;
    }
    var team_data = {
          name: this.teamform.controls['name'].value,
          sport: this.teamform.controls['sport'].value,
        }
        this.http.post("http://10.90.90.117:5555/teams", team_data).subscribe((res:any)=>{
        console.log(res)
        this.getTeams();
        this.submitted = false;
        this.teamform.reset()
        $('#exampleModal').modal("hide");
        })
        console.log(team_data) 
      
  }

  getTeams(){
    this.http.get("http://10.90.90.117:5555/teams").subscribe((res:any)=>{
      console.log(res)
      this.teams = res
    })
  }

  getDeleteTeam(id){
    this.delete_id = id
  }

  deleteTeam(){
    this.http.delete("http://10.90.90.117:5555/teams/"+this.delete_id).subscribe((res:any)=>{
      this.getTeams();
      $('#deleteModal').modal("hide");
    })
  }

  inviteTeam(){
    $('#deleteModal').modal("hide");
  }

  onReset(){
    this.submitted = false;
  }

}