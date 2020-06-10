import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';

import { Hero } from '../heros';

@Injectable({
  providedIn: 'root'      // https://stackoverflow.com/questions/50848357/what-is-the-purpose-of-providedin-with-the-injectable-decorator-when-generating#:~:text=When%20you%20provide%20the%20service,if%20it%20isn't%20used.
})
export class HeroService {

  private headers = new Headers({'Content-Type' : 'application/json'});
  private heroUrl = 'api/heroes' ; 

  constructor(private http : Http) { }
  
  getHeroes() : Promise<Hero[]> {
    return this.http.get(this.heroUrl)
       .toPromise()
       .then(response => response.json().data as Hero[])
       .catch(this.handleError)
  }

  getHero(id : number) : Promise<Hero> {
    const url = `${this.heroUrl}/${id}`
    return this.http.get(url).toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError)
  }
 
  delete(id : number) : Promise<void>{
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError)
  }

  create(name : string) : Promise<Hero>{
    return this.http
    .post(this.heroUrl , JSON.stringify({name : name}) , {headers : this.headers})
    .toPromise()
    .then(rest => rest.json().data as Hero)
    .catch(this.handleError);
  }

  update(hero : Hero) : Promise <Hero> {
      const url = `${this.heroUrl}/${hero.id}`
      return this.http.put(url , JSON.stringify(hero) , {headers : this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error : any) : Promise<any> {
    console.log('An Error Ocured' , error);
    return Promise .reject(error.message || error);
  }
}





