import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { AuthResponseData } from "./AuthResponseData";
import { Router } from "@angular/router";
import { Token } from "@angular/compiler";

@Injectable()
export class AuthService {
    user = new BehaviorSubject<UserModel>(null);
    tokenExpirationTimer : any;
    constructor(private http: HttpClient, private router:Router) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqmZFu7KzTOhKHh4ku_EyqMT74Rwj_grw', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response=>{
            this.handleAuthentication(response);
        }));
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqmZFu7KzTOhKHh4ku_EyqMT74Rwj_grw', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response=>{
            this.handleAuthentication(response);
        }));
    }


    autoLogout(expirationDuration :number ){
        this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin(){
        const userData: {
            email : string;
            id:string;
            _token: string;
            _tokenExpiration:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
            return;
        const loadUser = new UserModel(userData.email,userData.id,userData._token,new Date(userData._tokenExpiration));
        if(loadUser.token){
            this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/login'])
    }

    private handleAuthentication(responseData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const userModel = new UserModel(responseData.email, responseData.localId, responseData.idToken, expirationDate);
        this.user.next(userModel);
        this.autoLogout(+responseData.expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(userModel));

    }




    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error.message) {
            return throwError(() => new Error(errorMessage))
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists.';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'This email or password is not correct.';
                break;

        }
        return throwError(() => new Error(errorMessage))
    }
}