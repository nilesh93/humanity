import { UPDATE_USER, UserState, ADD_POINTS, SUB_POINTS } from './../reducers/user.reducer';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { URL_CONST } from '../config/config';
import 'rxjs/Rx';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    // = "591c01047840a58abb87f365"
    public id: string;
    public amount: number;
    public userInfo: Observable<Object>;


    constructor(private http: Http, private store: Store<UserState>) {
        this.userInfo = store.select('user');
    }

    saveUser(data) {
        return this.http.post(`${URL_CONST.HOST}/user`, data, this.getHeaders())
            .map((response) => response.json())
            .catch(this.handleError);
    }


    getUser(id = null) {
        let user_id = id ? id : this.id;
        return this.http.get(`${URL_CONST.HOST}/user/view/${user_id}`, this.getHeaders())
            .map((response) => response.json())
            .catch(this.handleError);
    }

    leaderboards(page) {
        return this.http.get(`${URL_CONST.HOST}/user/leaderboards?page=${page}`, this.getHeaders())
            .map((response) => response.json())
            .catch(this.handleError);
    }

    getRank(id) {
        return this.http.get(`${URL_CONST.HOST}/user/rank/${id}`, this.getHeaders())
            .map((response) => response.json())
            .catch(this.handleError);
    }



    dispatch(type, data) {
        switch (type) {
            case UPDATE_USER:
                this.store.dispatch({ type: UPDATE_USER, payload: data });
                this.amount = data.points;
                this.id = data._id;
                return;

            case ADD_POINTS:
                this.store.dispatch({ type: ADD_POINTS, payload: data });
                this.amount += data;
                return;

            case SUB_POINTS:
                this.store.dispatch({ type: SUB_POINTS, payload: data });
                this.amount -= data;
                return;

            default:
                return;
        }
    }


    /**
     * Common Function for headers
     * 
     * @returns 
     * 
     * @memberof UserService
     */
    getHeaders() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });
        return options;
    }

    /**
     * Common Function for handling Errors
     * 
     * @param {Response} res 
     * @returns 
     * 
     * @memberof UserService
     */
    handleError(res: Response) {
        console.log("****** CATCH");
        console.log(JSON.stringify(res.json()));
        return res.json();
    }
}