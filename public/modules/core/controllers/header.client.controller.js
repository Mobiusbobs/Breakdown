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

        $scope.blocks = [
            {
                'id': 1,
                'name': 'Standard Deviation',
                'Description': 'Standard Deviation Description'
            },
            {
                'id': 2,
                'name': 'Trigger Power',
                'Description': 'Hola'
            }
        ];
	}
]);