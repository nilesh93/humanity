import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class AdvertisementService {

    public headers = new Headers({
        'Content-Type': 'application/json'
    });

    public options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }


    getAdvertisements() {
        return this.http.get(`${URL_CONST.HOST}/advertisements`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }

    viewAdvertisement(id, userid) {
        return this.http.get(`${URL_CONST.HOST}/advertisements/view/${id}?user_id=${userid}`, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }

    advertisementPlayed(id, payload) {
        return this.http.put(`${URL_CONST.HOST}/advertisements/view_count/${id}`, payload, this.options)
            .map((response) => response.json()).catch((res: Response) => {
                console.log("****** CATCH");
                console.log(JSON.stringify(res.json()));
                return res.json();
            });
    }
}