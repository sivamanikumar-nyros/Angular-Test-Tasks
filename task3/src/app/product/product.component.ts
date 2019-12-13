import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Http} from '@angular/http';
import { HttpModule } from '@angular/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	product = {}
  constructor(private activatedroute: ActivatedRoute,private http: Http) { }

  ngOnInit() {
  	var viewpage = this.activatedroute.snapshot.params.id;
  	console.log(viewpage);
  	this.http.get('http://10.90.90.117:5555/products/'+viewpage).subscribe(res=>{
  		 this.product = res.json()
  		console.log(this.product)
  	})
  }

}
