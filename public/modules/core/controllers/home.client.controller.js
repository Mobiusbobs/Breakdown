'use strict';


angular.module('core').factory('prompt', function () {

    /* Uncomment the following to test that the prompt service is working as expected.
    return function () {
        return "Test!";
    }
    */

    // Return the browsers prompt function.
    return prompt;
})

//
// Application controller.
//
.controller('HomeController', ['$scope', '$http', 'prompt', function ($scope, $http, prompt) {
    $scope.free_blocks = [
        {
            name: 'num',
            data: {
                nodes: [
                    {
                        name: 'num',
                        type: 'data',
                        value: 1,
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [],
                        outputConnectors: [{ name : '' }]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'array',
            data: {
                nodes: [
                    {
                        name: 'array',
                        type: 'data',
                        value: [1, 2, 3],
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [],
                        outputConnectors: [{ name : '' }]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'plus',
            data: {
                nodes: [
                    {
                        name: '+',
                        type: 'plus',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'num' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'num' },
                        ]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'minus',
            data: {
                nodes: [
                    {
                        name: '-',
                        type: 'minus',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'num' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'num' },
                        ]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'multiple',
            data: {
                nodes: [
                    {
                        name: '*',
                        type: 'multiple',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'num' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'num' },
                        ]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'divide',
            data: {
                nodes: [
                    {
                        name: '/',
                        type: 'divide',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'num' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'num' },
                        ]
                    }
                ], 
                connections: []
            }
        }
    ];

    $scope.blocks = [];

    var chartDataModel = { nodes: [], connections: [] };
    $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);

    //
    // Code for the delete key.
    //
    var deleteKeyCode = 46;

    //
    // Code for control key.
    //
    var ctrlKeyCode = 65;

    //
    // Set to true when the ctrl key is down.
    //
    var ctrlDown = false;

    //
    // Code for A key.
    //
    var aKeyCode = 17;

    //
    // Code for esc key.
    //
    var escKeyCode = 27;

    //
    // Selects the next node id.
    //
    var nextNodeID = 100;

    //
    // Event handler for key-down on the flowchart.
    //
    $scope.keyDown = function (evt) {

        if (evt.keyCode === ctrlKeyCode) {

            ctrlDown = true;
            evt.stopPropagation();
            evt.preventDefault();
        }
    };

    //
    // Event handler for key-up on the flowchart.
    //
    $scope.keyUp = function (evt) {

        if (evt.keyCode === deleteKeyCode) {
            //
            // Delete key.
            //
            $scope.chartViewModel.deleteSelected();
        }

        if (evt.keyCode == aKeyCode && ctrlDown) {
            // 
            // Ctrl + A
            //
            $scope.chartViewModel.selectAll();
        }

        if (evt.keyCode == escKeyCode) {
            // Escape.
            $scope.chartViewModel.deselectAll();
        }

        if (evt.keyCode === ctrlKeyCode) {
            ctrlDown = false;

            evt.stopPropagation();
            evt.preventDefault();
        }
    };

    $scope.addBlock = function(title, type, value, base, inputNum, outputNum) {
        var inputConnectors = [], outputConnectors = [];

        if (type === 'data') {
            outputConnectors = [
                { name : '' }
            ]
        }
        else if (type === 'sum' || type === 'avg' || type === 'length') {
            inputConnectors = [
                { name : 'array' }
            ], 
            outputConnectors = [
                { name : 'num' }
            ]
        }
        else if (type === 'eachMinus' || type === 'eachPower') {
            inputConnectors = [
                { name : 'array' },
                { name : 'num'}
            ], 
            outputConnectors = [
                { name : 'array' },
            ]
        }
        else if (   type === 'plus' || 
                    type === 'minus' || 
                    type === 'multiple' || 
                    type === 'divide' ||
                    type === 'power') {
            inputConnectors = [
                { name : 'num' },
                { name : 'num'}
            ], 
            outputConnectors = [
                { name : 'num' },
            ]
        }

        var newBlock = {
            name: title,
            type: type,
            value: value,
            base: base,
            id: nextNodeID++,
            x: 0,
            y: 0,
            width: 125,
            inputConnectors: inputConnectors,
            outputConnectors: outputConnectors
        }

        $scope.chartViewModel.addNode(newBlock);
    };

    $scope.save = function() {
        var name = prompt("Please enter story name", "");

        var block = {
            name: name,
            data: $scope.chartViewModel.data
        };

        $scope.blocks.push(block);
        $scope.chartViewModel = new flowchart.ChartViewModel({nodes:[], connections:[]});

        $http.post('/someUrl', {msg:'hello word!'}).
        success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        }).
        error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    };

    $scope.add = function(block) {
        var id_map = {};

        if (!$scope.chartViewModel.nodes) {
            $scope.chartViewModel.nodes = [];
        }
        _.forEach(block.data.nodes, function(item) {
            var newBlock = {
                name: item.name,
                type: item.type,
                value: item.value,
                base: item.base,
                id: nextNodeID++,
                x: item.x,
                y: item.y,
                width: item.width,
                inputConnectors: item.inputConnectors,
                outputConnectors: item.outputConnectors
            }

            id_map[item.id] = newBlock.id;
            $scope.chartViewModel.addNode(newBlock);
        });

        console.log($scope.chartViewModel);

        if (!$scope.chartViewModel.data.connections) {
            $scope.chartViewModel.data.connections = [];
        }
        _.forEach(block.data.connections, function(item) {
            var startConnector = $scope.chartViewModel.findOutputConnector(id_map[item.source.nodeID], item.source.connectorIndex)
            var endConnector = $scope.chartViewModel.findInputConnector(id_map[item.dest.nodeID], item.dest.connectorIndex)
            $scope.chartViewModel.createNewConnection(startConnector, endConnector);
        });

        id_map = {};
    };

    $scope.output = function() {
        $scope.outJSON = {};
        $scope.outJSON.blocks = _.map($scope.chartViewModel.nodes, function(item) {
            return {
                name: item.data.id,
                type: item.data.type,
                value: item.data.value
            };
        });

        $scope.outJSON.links = _.map($scope.chartViewModel.connections, function(item) {
            return {
                src: item.data.source.nodeID,
                dest: item.data.dest.nodeID + ':' + item.data.dest.connectorIndex
            };
        });
        console.log($scope.outJSON.links);
        // $scope.chartViewModel.nodes;
        $scope.outText = angular.toJson($scope.outJSON, true);
    };

    //
    // Add an input connector to selected nodes.
    //
    $scope.addNewInputConnector = function () {
        var connectorName = prompt("Enter a connector name:", "New connector");
        if (!connectorName) {
            return;
        }

        var selectedNodes = $scope.chartViewModel.getSelectedNodes();
        for (var i = 0; i < selectedNodes.length; ++i) {
            var node = selectedNodes[i];
            node.addInputConnector({
                name: connectorName,
            });
        }
    };

    //
    // Add an output connector to selected nodes.
    //
    $scope.addNewOutputConnector = function () {
        var selectedNodes = $scope.chartViewModel.getSelectedNodes();
        for (var i = 0; i < selectedNodes.length; ++i) {
            var node = selectedNodes[i];
            node.addOutputConnector({
                name: '',
            });
        }
    };

    //
    // Delete selected nodes and connections.
    //
    $scope.deleteSelected = function () {

        $scope.chartViewModel.deleteSelected();
    };

}]);