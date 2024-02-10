import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) { }
	static dreamheader() {
		let headers = new Headers();
		headers.append('X-DreamFactory-Api-Key', 'd8d0db379f2cc83eeb02e77f89a35261948054bcb7a99ffcfb08a0764de7147b');
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		return headers;

	}
	// Authentication/Authorization
	login(email: string, password: string): Observable<User> {
		return this.http.post<User>(environment.API_SERVER + '/users/authenticateUser', { email, password });
	}

	getUserByToken(): Observable<any> {
		console.log('gettting user by id');
		let user;
		// const userToken = localStorage.getItem(environment.authTokenKey);
		// try {
		// 	user =JSON.parse(localStorage.getItem(userToken));
		// } catch (error) {

		// }

		if (!!user) {
			return of(user)
		}
		else {
			const httpHeaders = new HttpHeaders();
			return this.http.get<User>(environment.API_SERVER + '/users/authenticateUser', { headers: httpHeaders });
		}

	}
	updateIntegration(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpHeaders = new HttpHeaders();
		return this.http.get<User>(environment.API_SERVER + '/users/authenticateUser', { headers: httpHeaders });
	}

	register(user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		console.log('user', user);
		return this.http.post<User>(environment.API_SERVER + '/users', {
			action: 'adduser',
			name: user.username,
			email: user.email,
			phone: user.phone,
			password: user.password
		})
			.pipe(
				map((res: User) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}

	/*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
	public requestPassword(email: string): Observable<any> {
		console.log('Email', email);
		// return this.http.post(environment.API_SERVER + '/users/forgotPassword' , {email} )
		// 	.pipe(catchError(this.handleError('forgot-password', []))
		// );
		const httpHeaders = new HttpHeaders();
		return this.http.post('https://console.arrowai.in/api/users.php', {
			name: 'forgetpass',
			email,
			phone: 1234565678,
			password: 1234567,
			action: 'adduser'
		}
			// , {
			//     headers: httpHeaders
			// }
		)
			.pipe(catchError(this.handleError('forgot-password', []))
			);

	}

	getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(environment.API_SERVER);
	}

	getUserById(userId: number): Observable<User> {
		return this.http.get<User>(environment.API_SERVER + `/${userId}`);
	}

	// DELETE => delete the user from the server
	deleteUser(userId: number) {
		const url = `${environment.API_SERVER}/${userId}`;
		return this.http.delete(url);
	}

	// UPDATE => PUT: update the user on the server
	updateUser(_user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(environment.API_SERVER, _user, { headers: httpHeaders });
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<User>(environment.API_SERVER, user, { headers: httpHeaders });
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(environment.API_SERVER + '/findUsers', queryParams, { headers: httpHeaders });
	}

	// Permission
	getAllPermissions(): Observable<Permission[]> {
		return this.http.get<Permission[]>(API_PERMISSION_URL);
	}

	getRolePermissions(roleId: number): Observable<Permission[]> {
		return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
	}

	// Roles
	getAllRoles(): Observable<Role[]> {
		return this.http.get<Role[]>(API_ROLES_URL);
	}

	getRoleById(roleId: number): Observable<Role> {
		return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
	}

	// CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders });
	}

	// UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: number): Observable<Role> {
		const url = `${API_ROLES_URL}/${roleId}`;
		return this.http.delete<Role>(url);
	}

	// Check Role Before deletion
	isRoleAssignedToUsers(roleId: number): Observable<boolean> {
		return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
	}

	findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
	}

	/*
     * Handle Http operation that failed.
     * Let the app continue.
   *
   * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}

}
