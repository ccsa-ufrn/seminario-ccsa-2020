import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

export interface GT {
  name: string,
  syllabus: string,
  coordinators: string
}

export interface ThematicGroup {
  name: string,
  tgs: Array<GT>;
}

export interface News {
  id?: number;
  title: string;
  text: string;
  created_at: string;
}

export interface Submission {
  title: string;
  abstract: string;
  tg:string;
  file?:any;
}

@Injectable()
export class GeralService {

  constructor(private _http: Http) { }

  // host : string = 'http://localhost/seminario-ccsa-old/index.php';
  host: string = 'https://seminario2017.ccsa.ufrn.br';

  public getGts(): Observable<Array<ThematicGroup>> {
    return this._http.get('')
      .map((res: any) => { return res.json().data });
  }

  public getNews(): Observable<Array<News>> {
      return this._http
        .get('https://sigeva.ccsa.ufrn.br/api/event/5c0e57439e8a9b62858ede58/news/all')
        .map((res: any) => { return res.json().data });
  }

  public getNewsOne(id: number): Observable<News> {
    return this._http.get(`${this.host}/api/newsone/${id}`)
      .map((res: any) => { return res.json().data });
  }

  public sendMessage(name: string, email: string, message: string, subject: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('name', name);
    body.set('email', email);
    body.set('subject', subject);
    body.set('message', message);
    return this._http.post(`${this.host}/api/message`, body)
      .map((res: any) => { return res.json() });;
  }

  public createUser(name: string, email: string,
    cpf: string, category: string, institution: string,
    phone: string, password: string, repassword: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('name', name);
    body.set('email', email);
    body.set('cpf', cpf);
    body.set('type', category);
    body.set('institution', institution);
    body.set('phone', phone);
    body.set('pass', password);
    body.set('pass-repeate', repassword);
    return this._http.post(`${this.host}/api/new_user`, body)
      .map((res: any) => { return res.json() });
  }

  public login(email: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('pass', password);
    body.set('email', email);
    return this._http.post(`${this.host}/api/login`, body)
      .map((res: any) => { return res.json() });
  }

  public resetPass(email: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('email', email);
    return this._http.post(`${this.host}/api/forgot_pass`, body)
      .map((res: any) => { return res.json() });
  }

  public getGts2(): Observable<Array<ThematicGroup>> {
    return this._http.get('https://sigeva.ccsa.ufrn.br/api/event/5c0e57439e8a9b62858ede58/gts/all')
      .map((res: any) => { return res.json().data });
  }
  public getSubmissions(): Observable<Array<Submission>>{
    return this._http.get('https://sigeva.ccsa.ufrn.br/api/event/5c0e57439e8a9b62858ede58/submissions/all')
      .map((res: any) => { return res.json();});
  }



}
