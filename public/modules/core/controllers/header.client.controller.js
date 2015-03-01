'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $scope.doBuy = function(blockId){
            $.ajax({type: 'POST',url: '/blocks/'+blockId}).success(function(user){
                console.log(user);
                $scope.authentication.user.boughtBlocks = user.boughtBlocks;
                $scope.$apply();
            });
        };

        $scope.blocks = [
            {
                'id': -1,
                'name': 'Plus',
                'description': '1+1=2',
                'price': 0,
                'data': {}
            },
            {
                'id': 0,
                'name': 'minus',
                'description': '1-1=0',
                'price': 0,
                'data': {}
            },
            {
                'id': 1,
                'name': 'Standard Deviation',
                'description': 'Standard Deviation Description',
                'price': 10,
                'data': {}
            },
            {
                'id': 2,
                'name': 'Trigger Power',
                'description': 'Hola',
                'price': 199,
                'data': {}
            },
            {
                'id': 3,
                'name': 'Trigger Power3',
                'description': 'Hola',
                'price': 1999,
                'data': {}
            },
            {
                'id': 4,
                'name': 'Trigger Power4',
                'description': 'Hola',
                'price': 19999,
                'data': {}
            },
            {
                'id': 5,
                'name': 'Trigger Power5',
                'description': 'Hola',
                'price': 199999,
                'data': {}
            },
            {
                'id': 6,
                'name': 'Trigger Power6',
                'description': 'Hola',
                'price': 19999999,
                'data': {}
            },
            {
                'id': 7,
                'name': 'Trigger Power7',
                'description': 'Hola',
                'price': 19999999,
                'data': {}
            }
        ];
	}
]);