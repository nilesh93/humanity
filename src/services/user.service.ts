import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class UserService {

    public id: string = "591c01047840a58abb87f365";

    public headers = new Headers({
        'Content-Type': 'application/json'
    });

    public options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }

    saveUser(data) {
        return this.http.post(`${URL_CONST.HOST}/user`, data, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }


    getUser() {
        return this.http.get(`${URL_CONST.HOST}/user/view/${this.id}`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }

    leaderboards() {
        return this.http.get(`${URL_CONST.HOST}/user/leaderboards`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }
}