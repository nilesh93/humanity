import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class AdvertisementService {

    constructor(private http: Http, private userService: UserService) { }


    getAdvertisements(page) {
        return this.http.get(`${URL_CONST.HOST}/advertisements?page=${page}`, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    viewAdvertisement(id, userid) {
        return this.http.get(`${URL_CONST.HOST}/advertisements/view/${id}?user_id=${userid}`, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    advertisementPlayed(id, payload) {
        return this.http.put(`${URL_CONST.HOST}/advertisements/view_count/${id}`, payload, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }
}