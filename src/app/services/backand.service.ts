import { Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { BackandService } from '@backand/angular2-sdk';
import 'rxjs/Rx';
import { NavController} from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import {Observable} from 'rxjs/Observable';

@Injectable ()
export class BackandServiceClass{
    http:any;
    baseUrl: String;
    LOCAL_TOKEN_KEY = 'yourTokenKey';
    email = '';
    isAuthenticated = false;
    authToken;
    userId = 'userId';
    firstName = 'firstName';
    date = new Date();
    
    
    constructor (private backand: BackandService, http:Http
    //    , public navCtrl: NavController
    ){
        this.http = http;
        this.baseUrl = 'https://api.backand.com:443';
   }


    loadUserCredentials() {
        var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
        if (token) {
            this.useCredentials(token);
        }
    }

    storeUserCredentials(response) {
        this.isAuthenticated = true;
        window.localStorage.setItem(this.LOCAL_TOKEN_KEY, 'user.' + response.access_token);
        window.localStorage.setItem(this.userId, response.userId);
        window.localStorage.setItem(this.firstName, response.firstName);
        this.useCredentials('user.' + response.access_token);
        console.log(response);
        console.log("YYEEAAHHH");
    }

    useCredentials(token) {
        this.email = token.split('.')[0];
        this.isAuthenticated = true;
        this.authToken = token;

    }

    destroyUserCredentials() {
        this.authToken = undefined;
        this.email = '';
        this.isAuthenticated = false;
        //this.http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(this.userId);
        window.localStorage.removeItem(this.firstName);
    }

   

    setUpBackandService(): void {
        //this.res = 'fetching objects...';
        this.backand.object.getList('users').then((res: any) => {
         // this.res = `${res.data.length} objects fetched`;
          console.log(res);
        })
      }
    
      ngOnInit(): void {
        this.backand.init({
          appName: 'mylifecloud',
          anonymousToken: 'f9093480-8896-465f-8054-07b7e4159679',
          signUpToken: 'f01f9297-5473-476a-806d-060082774921'
        });
        this.setUpBackandService();
     }

    // getLogs(){
    //     return this.http.get(this.baseUrl+'/')
    //     .map(res => res.json());
    // }

    login (email, pw) {
        //var response =  
        return this.backand.signin(email, pw).then(response => {
            console.log(response); 
            this.storeUserCredentials(response);
            //navCtrl.push(MainPage);
        }
        )
     };

    signUp (account) {
        console.log(account.firstName+account.lastName+account.email+account.password);
        return this.backand.signup(account.firstName, account.lastName, account.email, account.password, account.password).then (response => {
            this.login(account.email, account.password);
        })
        ;
    };

getTodayTagsData() {

    return this.backand.object.getList("Log", {
        "pageSize": 20,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
      //.map(data => {console.log(data);})
    //  .then(data => { console.log(data)})
    //  .catch(error => { })

//return this.http.get('https://api.backand.com:443/1/objects/Log?pageSize=20&pageNumber=1').map(res => console.log(res));

// return Observable.create(observer => {
//     observer.next(this.backand.object.getList("Log", {
//             "pageSize": 20,
//             "pageNumber": 1,
//             "filter": [],
//             "sort": []
//           }));
//     observer.complete(console.log(observer));
// })

}

//      getTodayTagsData() {
//         return this.http.get({
//             method: 'GET',
//             url: this.baseUrl + '/1/objects/Log?',
//             params: {
//                 pageSize: 20,
//                 pageNumber: 1,
//                 filter: [
//                     {
//                         fieldName: 'user',
//                         operator: 'in',
//                         value: this.userId
//                     },
//                     {
//                         fieldName: 'createdAt',
//                         operator: 'equals',
//                         value: this.date
//                     }
//                 ],
// //                sort: [{fieldName: "type", order: "desc"}]
//             }
//         }).map(res => res.json());
//         // .success(function (data) {
//         //     callback(data);
//         //     console.log(data);
//         //    this.rootScope.$broadcast('entryTagsReceived', {
//         //         data: data.data  
//         //     });
//         // })
//         // 
//         ;
//     }

}




//fromn old version
/*
angular.module('starter.services', [])

        .service('tagsCloudService', function ($http, Backand, sharedProportyService, $rootScope, $state) {
            var tagsCloudLove = [];
            var tagsCloudAvoid = [];
            var tagsCloudData = [];
            var userId = sharedProportyService.getsignedInUser().userId;
            var date = sharedProportyService.getTodayFilteredDate();
            var entryData = [];
            function getTodayTagsData(callback) {
                $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/tagsLog',
                    params: {
                        pageSize: 20,
                        pageNumber: 1,
                        filter: [
                            {
                                fieldName: 'user',
                                operator: 'in',
                                value: userId
                            },
                            {
                                fieldName: 'date',
                                operator: 'equals',
                                value: date
                            }
                        ],
                        sort: [{fieldName: "type", order: "desc"}]
                    }
                }).success(function (data) {
                    callback(data);
                    $rootScope.$broadcast('entryTagsReceived', {
                        data: data.data
                    });
                });
            }
            ;
            function getTagsCloudData(callback) {
                $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/tagsCloud',
                    params: {
                        pageSize: 20,
                        pageNumber: 1,
                        filter: [
                            {
                                fieldName: 'user',
                                operator: 'in',
                                value: userId
                            }
                        ],
                        sort: [{fieldName: "weight", order: "desc"}]
                    }
                }).success(function (data) {
                    callback(data);
                    tagsCloudData = data.data;
                    var j = 0;
                    var k = 0;
                    for (i = 0; i < data.data.length; i++)
                    {
                        if (data.data[i].type === "love")
                            tagsCloudLove[j++] = data.data[i];
                        else
                            tagsCloudAvoid[k++] = data.data[i];
                    }
                });
            }
            ;

            var factory = {};
            factory.getTagsCloud = function () {
                getTagsCloudData(function (data) {
                    return data;
                });
            };
            factory.getTodayTags = function () {
                getTodayTagsData(function (data) {
                    return data;
                });
            };
            factory.getTagsCloudLove = function () {
                return tagsCloudLove;
            };
            factory.getTagsCloudAvoid = function () {
                return tagsCloudAvoid;
            };
            factory.getTagsCloudData = function () {
                return tagsCloudData;
            };
            factory.submitTodayTags = function (tagsToAdd) {
                entryData = tagsToAdd;
                console.log(date);
                $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/deleteTags',
                    params: {
                        parameters: {
                            user: userId,
                            date: date
                        }
                    }
                }).success(function (data) {
                    console.log("deleteTags:" + data);
                    console.log(date);
                    $http({
                        method: 'POST',
                        url: Backand.getApiUrl() + '/1/objects/tagsLog',
                        data: entryData
                    }).success(function (data) {
                        console.log("updateTags:" + data);
                        $http({
                            method: 'GET',
                            url: 'https://api.backand.com/1/query/data/updateTagsCloud?',
                            parameters: {
                                user: userId
                            }
                        }).success(function (data) {
                            console.log("updateCloud:" + data);
                            $state.go('tab.cloud');
                        });

                    });
                });
            };
            return factory;
        })
        .service('AuthService', function (Backand, $q, $http, USER_ROLES) {
            var LOCAL_TOKEN_KEY = 'yourTokenKey';
            var email = '';
            var isAuthenticated = false;
            var role = USER_ROLES.public;
            var authToken;
            var userId = 'userId';
            var firstName = 'firstName';


            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            }

            function storeUserCredentials(response) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, 'user.' + response.access_token);
                window.localStorage.setItem(userId, response.userId);
                window.localStorage.setItem(firstName, response.firstName);
                useCredentials('user.' + response.access_token);
            }

            function useCredentials(token) {
                email = token.split('.')[0];
                isAuthenticated = true;
                authToken = token;

                if (email === 'paidUser') {
                    role = USER_ROLES.paidUser;
                }
                if (email === 'user') {
                    role = USER_ROLES.user;
                }


                // Set the token as header for your requests!
                $http.defaults.headers.common['X-Auth-Token'] = token;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                email = '';
                isAuthenticated = false;
                $http.defaults.headers.common['X-Auth-Token'] = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                window.localStorage.removeItem(userId);
                window.localStorage.removeItem(firstName);
            }

            var login = function (name, pw) {

                return Backand.signin(name, pw)
                        .then(function (response) {
                            console.log(response);
                            storeUserCredentials(response);
                            isAuthenticated = true;
                            return response;
                        }, function (reason) {
                            console.log(reason);
                            return('error');
                        });



            };

            var signup = function (firstName, lastName, email, password, parameters) {
                return Backand.signup(firstName, lastName, email, password, password, parameters)
                        .then(function (signUpResponse) {
                            console.log(signUpResponse);
                            if (signUpResponse != null) {
                                return login(email, password)
                                        .then(function () {
                                            return signUpResponse;
                                        });

                            } else {
                                return signUpResponse;
                            }
                        }, function (reason) {
                            console.log(reason);
                            return(reason);
                        });
            };
            function showError(error) {
                self.error = error && error.data || error.error_description || 'Unknown error from server';
            }
            var logout = function () {
                destroyUserCredentials();
            };
            var isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
            };

            loadUserCredentials();

//            var self = this;
//            self.currentUser = {};
//            loadUserDetails();
//
//            function loadUserDetails() {
//
//                return Backand.getUserDetails()
//                        .then(function (data) {
//                            self.currentUser.details = data;
//                            console.log(data);
//                            if (data !== null)
//                                self.currentUser.name = data.username;
//                        });
//
//            }
//
//            self.getSocialProviders = function () {
//                return Backand.getSocialProviders()
//            };
//
//            self.socialSignin = function (provider) {
//                Backand.setRunSignupAfterErrorInSigninSocial(false); //by default run sign-up if there is no sign in
//                return Backand.socialSignin(provider)
//                        .then(function (response) {
//                            loadUserDetails();
//                            return response;
//                        });
//            };
//
//            self.socialSignup = function (provider) {
//                return Backand.socialSignUp(provider)
//                        .then(function (response) {
//                            loadUserDetails();
//                            return response;
//                        });
//            };
//
//            self.signin = function (email, password) {
//                return Backand.signin(email, password)
//                        .then(function (response) {
//                            loadUserDetails();
//                            console.log(response);
//                            storeUserCredentials('admin' + response.access_token);
//                            return response;
//                        });
//            };
//            
//            var login = self.signin();
//

//
//            self.changePassword = function (oldPassword, newPassword) {
//                return Backand.changePassword(oldPassword, newPassword)
//            };
//
//            self.requestResetPassword = function (email) {
//                return Backand.requestResetPassword(email)
//            };
//
//            self.resetPassword = function (password, token) {
//                return Backand.resetPassword(password, token)
//            };
//
//            self.logout = function () {
//                Backand.signout().then(function () {
//                    angular.copy({}, self.currentUser);
//                    destroyUserCredentials();
//                });
//            };

            return {
                login: login,
                logout: logout,
                signup: signup,
                isAuthorized: isAuthorized,
                isAuthenticated: function () {
                    return isAuthenticated;
                },
                email: function () {
                    return email;
                },
                role: function () {
                    return role;
                },
                userId: userId,
                firstName: firstName
            };
        })
        .service('sharedProportyService', function ($filter) {
            var signedInUser = {signedIn: 'false', userId: '', firstName: ''};
            var date = new Date();
            var userId = 'userId';
            var firstName = 'firstName';
            var todayDate = $filter('date')(date, "yyyy-MM-dd");
            todayDate += 'T08:00:00';
            return {
                getsignedInUser: function () {
                    console.log(window.localStorage);
                    signedInUser.signedIn = true;
                    signedInUser.userId = window.localStorage.getItem("userId");
                    ;
                    signedInUser.firstName = window.localStorage.getItem(firstName);
                    console.log(signedInUser);
                    return signedInUser;
                },
                setsignedInUser: function (signedIn, userId, firstName) {
                    signedInUser.signedIn = signedIn;
                    signedInUser.userId = userId;
                    signedInUser.firstName = firstName;
                },
                getTodayFilteredDate: function () {
                    ;
                    return todayDate;
                }
            };
        })
        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        });

*/