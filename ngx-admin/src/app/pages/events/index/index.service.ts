import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbTokenStorage } from '@nebular/auth';
import { eventIndex, eventShow, eventUpdate, eventDelete } from './index.model';

import { from } from 'rxjs';



@Injectable()
export class EventIndexService {


    constructor(private http: HttpClient,private tokenStorage: NbTokenStorage) { }

    token: any;
    headersBearer() {
        this.token = this.tokenStorage.get();
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.token}`
        );
        return headers;
      }

    index(page) {
        const url = `/api/v1/events?page=${page}`;
        const headers = this.headersBearer();
        
        return this.http.get<eventIndex>(url, {headers: headers}).pipe(map(val => val));
    }

    show(_id) {
        const url = `/api/v1/events/${_id}`;
        const headers = this.headersBearer();
        return this.http.get<eventShow>(url, {headers: headers}).pipe(map(val => val));
    }

    update(_id, _name, _slug, _start_at, _end_at) {

        const url = `/api/v1/events/${_id}`;
        const headers = this.headersBearer();
        return this.http
            .patch<eventUpdate>(url, {
                name: _name,
                slug: _slug,
                startAt: _start_at,
                endAt: _end_at
            }, {headers: headers})
            .pipe(map(val => val));
    }

    delete(_id){
        const url = `/api/v1/events/${_id}`;
        const headers = this.headersBearer();
        return this.http.delete<eventDelete>(url,{headers: headers}).pipe(map(val => val));
    }

    getFilter() {
        const val = [{ id: 1, no: 10 }, { id: 2, no: 50 }, { id: 3, no: 100 }];
        return val;
    }


}
