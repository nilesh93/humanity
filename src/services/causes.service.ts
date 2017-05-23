import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_CONST } from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class CauseService {

    constructor(private http: Http, private userService: UserService) { }

    getCauses(page, user_id, filter, search) {
        return this.http.get(`${URL_CONST.HOST}/causes?page=${page}&filter=${filter}&user_id=${user_id}&search=${search}`,
            this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    viewCauses(id) {
        return this.http.get(`${URL_CONST.HOST}/causes/view/${id}`, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    donate(id, payload) {
        return this.http.put(`${URL_CONST.HOST}/causes/donate/${id}`, payload, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    watch(id, user_id) {
        return this.http.put(`${URL_CONST.HOST}/causes/watch/${id}`, { user_id: user_id }, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }

    unwatch(id, user_id) {
        return this.http.put(`${URL_CONST.HOST}/causes/unwatch/${id}`, { user_id: user_id }, this.userService.getHeaders())
            .map((response) => response.json())
            .catch(this.userService.handleError);
    }
}