'use strict';

angular
		.module('app')
		.controller('HomeCtrl',
				[ '$scope', '$rootScope', '$log', '$http', '$location',

				function($scope, $rootScope, $log, $http, $location) {

					// This object will be filled by the form
				
					console.log("outside login:"+$rootScope.user+ "check"+ !(angular.isUndefined($rootScope.user)));
					if(!(angular.isUndefined($rootScope.user)) && $rootScope.user!==null && $rootScope.user!=='')
					{
						console.log("user login"+$rootScope.user);
						$rootScope.userAvailable = true;
					}
					else{
						console.log("no user"+$rootScope.user);
						$rootScope.userAvailable = false;
					}
					
					$scope.logOut = function(){
						$rootScope.user='';
						$rootScope.userAvailable = false;
						console.log('logout'+$rootScope.user+"fh"+$rootScope.userAvailable);
						$location.url('/');
					}

					console.log('hello to loginfgggg');
				}

				])
		.controller(
				'LoginCtrl',
				[
						'$scope',
						'$rootScope',
						'$log',
						'$http',
						'$location',

						function($scope, $rootScope, $log, $http, $location) {

							// This object will be filled by the form
							$scope.user = {};

							$scope.loginerror = '';

							console.log('hello to loginfgggg');

							// Register the login() function

							$scope.login = function() {
								if((angular.isUndefined($scope.user.username))|| $scope.user.username=='' || $scope.user.username == null){
									$scope.loginerror = 'Please enter Username';
									
								}
								else if((angular.isUndefined($scope.user.password))|| $scope.user.password=='' || $scope.user.password == null){
									$scope.loginerror = 'Please enter password';
									
								}
								else{
								
								var loginObject = {

									userName : $scope.user.username,

									password : $scope.user.password

								}

								var loginParams = JSON.stringify(loginObject);
								

								$http(
										{

											method : 'POST',

											url : 'https://predix-tracktraceservice-sm.run.aws-usw02-pr.ice.predix.io/login',

											data : loginParams,

											headers : {

												'Content-Type' : 'application/json'

											}
										})
										.then(
												function(data) {
													console.log("response:"+data.data.status);
													if(data.data.status=="200"){
														$rootScope.user = $scope.user.username;
														$rootScope.userAvailable = true;
														$location.url('/');
													}
													else{
														$scope.loginerror = 'Username or password not valid.';
													}
													

												},
												function(error,data,status) {
													console.log("response:"+data+ "status"+status);
													console.log(error);

													$scope.loginerror = 'Authentication failed.';
													
												
												});
								}
							};

						}

				])

		.controller('RegisterCtrl',
				[ '$scope', '$rootScope', '$http', '$location',

				function($scope, $rootScope, $http, $location) {
					
					$scope.reg = {};

					$scope.registerError = '';
					
					$scope.register = function() {
						if((angular.isUndefined($scope.reg.fName))|| $scope.reg.fName=='' || $scope.reg.fName == null){
							$scope.registerError = 'Please enter Full name';
							
						}
						else if((angular.isUndefined($scope.reg.username))|| $scope.reg.username=='' || $scope.reg.username == null){
							$scope.registerError = 'Please enter Username';
							
						}
						else if((angular.isUndefined($scope.reg.email))|| $scope.reg.email=='' || $scope.reg.email == null){
							$scope.registerError = 'Please enter Email address';
							
						}
						else if((angular.isUndefined($scope.reg.password))|| $scope.reg.password=='' || $scope.reg.password == null){
							$scope.registerError = 'Please enter Password';
							
						}
						else if((angular.isUndefined($scope.reg.confirmPassword))|| $scope.reg.confirmPassword=='' || $scope.reg.confirmPassword == null){
							$scope.registerError = 'Please enter Confirm Password';
							
						}
						else{
						
						var registerObject = {
								
								fullName : $scope.reg.fName,
								userName : $scope.reg.username,
								email : $scope.reg.email,
								password : $scope.reg.password

							}

							var registerParams = JSON.stringify(registerObject);

							$http(
									{

										method : 'POST',

										url : 'https://predix-tracktraceservice-sm.run.aws-usw02-pr.ice.predix.io/register',

										data : registerParams,

										headers : {

											'Content-Type' : 'application/json'

										}
									})
									.then(
											function(data) {

												console.log("response:"+data.data.status);
																					
												console.log("response:"+data.data.object);
												if(data.data.status=="200"){
													if($scope.reg.password !== $scope.reg.confirmPassword){
														$scope.registerError = 'Passwords does not match.';
													}
													else{
													$rootScope.user = $scope.reg.username;
													$rootScope.userAvailable = true;
													$location.url('/');
													}
												}
												else if(data.data.message=="Exists" ){
													$scope.registerError = 'Username already exists ';
												}
												else{
													$scope.registerError = 'Registration failed.';
												}
												

											},
											function(error) {

												console.log(error);

												$scope.registerError = 'Registration failed.';
												
											
											});
						}
					};

				}

				])
  .controller('CreateWrkCtrl',
				[ '$scope', '$rootScope', '$http', '$location',

				function($scope, $rootScope, $http, $location) {
					
					$scope.worker = {};
					$scope.status ='active';
					$scope.crtError = '';
					console.log("in create worker control");
					$scope.createWrk = function() {
						if((angular.isUndefined($scope.worker.firstname))|| $scope.worker.firstname=='' || $scope.worker.firstname == null){
							$scope.loginerror = 'Please enter First Name';
							
						}
						else if((angular.isUndefined($scope.worker.lastname))|| $scope.worker.lastname=='' || $scope.worker.lastname == null){
							$scope.loginerror = 'Please enter Last Name';
							
						}
						else if((angular.isUndefined($scope.worker.email))|| $scope.worker.email=='' || $scope.worker.email == null){
							$scope.loginerror = 'Please enter Email';
							
						}
						else if((angular.isUndefined($scope.worker.city))|| $scope.worker.city=='' || $scope.worker.city == null){
							$scope.loginerror = 'Please enter City';
							
						}
						/*else if((angular.isUndefined($scope.worker.phone))|| $scope.worker.phone=='' || $scope.worker.phone == null){
							$scope.loginerror = 'Please enter Phone';
							
						}*/
					
						else{
						
						var workerObject = {
								
								firstname : $scope.worker.firstname,
								lastname : $scope.worker.lastname,
								email : $scope.worker.email,
								city : $scope.worker.city,
								//phone : $scope.worker.phone,
                             status: $scope.worker.status='Active'
							}

							var workerParams = JSON.stringify(workerObject);

							$http(
									{

										method : 'POST',

										url : 'https://tracktraceworker.run.aws-usw02-pr.ice.predix.io/createWorker',

										data : workerParams,

										headers : {

											'Content-Type' : 'application/json'

										}
									})
									.then(
											function(data) {

												console.log("response:"+data.data.status);
																					
												console.log("response:"+data.data.object);
												console.log("response:"+data.data.message);
												if(data.data.status=="200"){
													
												}
												else{
													$scope.crtError = 'Creation failed.';
												}
												

											},
											function(error) {

												console.log(error);

												$scope.crtError = 'Creation failed.';
												
											
											});
						}
					};

				}

				])    
          .controller('ToolCtrl', ['$scope', '$rootScope', '$http', '$location',   
       function($scope, $rootScope, $http, $location) {
 
                                  //$location.url('/wrkList');
        console.log("in tool control");
        $http({
                                  method : 'GET',
 
                                  url : ' ',
 
                                  headers : {
 
                                         'Content-Type' : 'application/json'
 
                                  }
                           })
                           .then(
                                         function(data) {
                                                  $scope.tools = data.data;
                                                  console.log(JSON.stringify($scope.tools));
 
                                         },
                                         function(error) {
 
                                                console.log(error);
                                               
                                        
                           });
             
                     }
              ])
		.controller('ForgotPasswordCtrl',
				[ '$scope', '$rootScope', '$http', '$location',

				function($scope, $rootScope, $http, $location) {

					$scope.user = {};

					$scope.forgotpassword = function() {

						$http.post('/forgot-password', {

							text : $scope.text

						})

						.success(function(response) {

							$scope.response = response;

						})

						.error(function(error) {

							$scope.response = error;

						});

					};

				}

				])

		.controller(
				'ResetPasswordCtrl',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$location',
						'$stateParams',

						function($scope, $rootScope, $http, $location,
								$stateParams) {

							$scope.user = {};

							$scope.resetpassword = function() {

								$http
										.post(
												'/reset/'
														+ $stateParams.tokenId,
												{

													password : $scope.user.password,

													confirmPassword : $scope.user.confirmPassword

												})

										.success(
												function(response) {

													$rootScope.user = response.user;

													$rootScope
															.$emit('loggedin');

													if (response.redirect) {

														if (window.location.href === response.redirect) {

															// This is so an
															// admin user will
															// get full admin
															// page

															window.location
																	.reload();

														} else {

															window.location = response.redirect;

														}

													} else {

														$location.url('/');

													}

												})

										.error(
												function(error) {

													if (error.msg === 'Token invalid or expired')

														$scope.resetpassworderror = 'Could not update password as token is invalid or may have expired';

													else

														$scope.validationError = error;

												});

							};

						}

				]);
