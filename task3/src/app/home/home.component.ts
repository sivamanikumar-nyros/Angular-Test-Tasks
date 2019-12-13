import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http} from '@angular/http';
import { Options } from 'angular-2-daterangepicker';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private apiUrl = 'http://10.90.90.117:5555/products';
  data = [];
  status_data: [];

  // ************ datePicker used to sort products data *********

  Results : [];
  from_date ;
  end_date ;
  final_results= [];
  
  // ***************************************************************

  constructor(private router: Router,private http: Http) {

  	this.getProducts();
    this.getProductsLarge();
  }

  getProducts(){
    return this.http.get(this.apiUrl);
    console.log(this.apiUrl)
  }

  getProductsLarge(){
    this.getProducts().subscribe(data => {
      this.data = data.json();
      console.log(data.json() , "--------------------");
      this.Results = data.json()
    })
  }

  active(x: number){
    console.log("============+++++=====",x);
    this.http.get("http://10.90.90.117:5555/products?status_id="+x).subscribe(res=>{
      this.data = res.json();
    })
  }
  

  // ************ datePicker used to sort products data *********

  fromdate(date){
    console.log('siva',date)
    this.from_date = Date.parse(date);
  }
  enddate(date){
    console.log('siva',date)
    this.end_date = Date.parse(date);

  }

  filter(){
    console.log("sivaaaaaaaaaaaaaa",this.data)
    this.data.map(item =>{
      console.log(item.date)
      var x = Date.parse(item.date)
      if (this.from_date < x && this.end_date > x){
        this.final_results.push(item)
        console.log(this.final_results);
        this.data = this.final_results;
      }
      console.log(x)
    })
  }

  // ***************************************************************

  ngOnInit() {
    
    this.http.get('http://10.90.90.117:5555/status').subscribe(res=>{
      this.status_data = res.json()
        console.log("=========",this.status_data );
    })
  }
}