'use strict';

angular.module('core').controller('MarketController', ['$scope', 'Authentication', 
	function($scope, Authentication) {
		$scope.authentication = Authentication;

        $scope.doBuy = function(blockId){
            $.ajax({type: 'POST',url: '/blocks/'+blockId}).success(function(user){
                console.log(user);
                $scope.authentication.user.boughtBlocks = user.boughtBlocks;
                $scope.$apply();
            });
        };

        $scope.blocks = [
            {
                id: 1,
                name: '',
                data: {
                    nodes: [
                        {
                            name: 'num',
                            type: 'data',
                            value: 1,
                            id: 1,
                            x: 0,
                            y: 0,
                            width: 125,
                            inputConnectors: [],
                            outputConnectors: [{ name : '' }]
                        }
                    ], 
                    connections: []
                }
            }
        ];
	}
]);