import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class DonationService {

    constructor(private http: Http) { }


    getDonationHistory(user_id, page) {
        return this.http.get(`${URL_CONST.HOST}/user/donations/${user_id}?page=${page}`)
            .map((response) => response.json());
    }

}