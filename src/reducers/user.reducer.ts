import { ActionReducer, Action } from '@ngrx/store';

export const UPDATE_USER = 'UPDATE_USER';
export const ADD_POINTS = 'ADD_POINTS';
export const SUB_POINTS = 'SUB_POINTS';

export interface UserState {
    id: String,
    name: String,
    email: String,
    points: number,
    join_date: Date,
    img: String,
    facebook: String,
    google: String,
    advertisements_pending: Array<any>;
}

export const UserReducer: ActionReducer<UserState> = (state: UserState, action: Action) => {
    if (!state) {
        state = <UserState>{};
    }
    switch (action.type) {
        case UPDATE_USER:
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.points = action.payload.points;
            state.join_date = action.payload.join_date;
            state.facebook = action.payload.facebook;
            state.google = action.payload.google;
            state.advertisements_pending = action.payload.advertisements_pending;
            state.img = action.payload.img;
            return state;

        case ADD_POINTS:
            state.points += action.payload;
            return state;

        case SUB_POINTS:
            state.points -= action.payload;
            return state;

        default:
            return state;
    }
};