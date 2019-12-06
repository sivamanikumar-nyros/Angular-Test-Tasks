import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any): any {
    //check if search command is undefined
    if (term === undefined ) return users;
    //return updated users array
    return users.filter(function(user){
    	return user.fname.toLowerCase().includes(term.toLowerCase());
    })
  }
}