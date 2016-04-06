angular.module('myApp', ['ngRoute', 'btford.socket-io', 'btford.modal', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl as home'
		}).when('/gamePlay/:category/:userName', {
			templateUrl: 'views/gamePlay.html',
			controller: 'GamePlayCtrl as gamePlay'
		}).when('/gameOver', {
			templateUrl: 'views/gameOver.html',
			controller: 'GameOverCtrl as gameOver'
		}).when('/preGame', {
			templateUrl: 'views/preGame.html',
			controller: 'PregameCtrl as preGame'
		}).otherwise('error', {
			template: '<p>Error - Page not Found</p>'
		});
	}])
	.factory('socket', function(socketFactory) {
		var mySocket = socketFactory();
		mySocket.forward('gameStarted');
		return mySocket;
	})
	.factory('welcomeModal', function(btfModal) {

		return btfModal({
			controller: 'WelcomeCtrl',
			controllerAs: 'welcome',
			templateUrl: 'views/welcome.html'
		});
	})
	.factory('countDownModal', function(btfModal) {

		return btfModal({
			controller: 'CountDownCtrl',
			controllerAs: 'countDown',
			templateUrl: 'views/roundCountDown.html'
		});
	})
	.factory('currentCategory', function() {
		return {
			category: ""
		};
	})
	.factory('gameData', function() {
		var firstTimeUser = true;
		var gameCopy = {};

		var player1 = {
			name: "",
			score: ""
		};
		var player2 = {
			name: "",
			score: ""
		};
		var roomId = "";

		return {
			setFirstTimeUser: function(value) {
				firstTimeUser = value;
			},
			setGameInfo: function(response) {
				gameCopy = response;
			},
			setPlayer1Name: function(name) {
				player1.name = name;
			},
			setPlayer2Name: function(name) {
				player2.name = name;
			},
			setPlayer1Score: function(score) {
				player1.score = score;
			},
			setPlayer2Score: function(score) {
				player2.score = score;
			},
			setRoomId: function(roomId) {
				roomId = roomId;
			},
			getFirstTimeUser: function() {
				return firstTimeUser;
			},
			getGameInfo: function() {
				return gameCopy;
			},
			getRoomId: function() {
				return roomId;
			},
			getPlayer1Name: function() {
				return player1.name;
			},
			getPlayer2Name: function() {
				return player2.name;
			},
			getPlayer1Score: function() {
				return player1.score;
			},
			getPlayer2Score: function() {
				return player2.score;
			}
		};
	});


