import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbTokenStorage } from '@nebular/auth';
import { eventCreate } from './create.model';

import { from } from 'rxjs';



@Injectable()
export class EventCreateService {


    constructor(private http: HttpClient) { }

    create( _name, _slug, _start_at, _end_at) {

        const url = `/api/v1/events`;

        return this.http
            .post<eventCreate>(url, {
                name: _name,
                slug: _slug,
                startAt: _start_at,
                endAt: _end_at
            }, {})
            .pipe(map(val => val));
    }

    


}
