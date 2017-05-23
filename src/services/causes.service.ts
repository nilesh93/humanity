import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class CauseService {

    public headers = new Headers({
        'Content-Type': 'application/json'
    });

    public options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }

    getCauses(page) {
        return this.http.get(`${URL_CONST.HOST}/causes?page=${page}`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }

    viewCauses(id) {
        return this.http.get(`${URL_CONST.HOST}/causes/view/${id}`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }

    donate(id, payload) {
        return this.http.put(`${URL_CONST.HOST}/causes/donate/${id}`, payload, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }
}