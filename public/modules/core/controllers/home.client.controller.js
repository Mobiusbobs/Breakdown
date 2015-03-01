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
.controller('HomeController', ['$scope', 'prompt', function ($scope, prompt) {
    $scope.blocks = [];


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
    var nextNodeID = 10;

    //
    // Setup the data-model for the chart.
    //
    var chartDataModel = {

        // nodes: [
        //     {
        //         name: "Example Node 1",
        //         id: 0,
        //         x: 0,
        //         y: 0,
        //         width: 200,
        //         inputConnectors: [
        //             {
        //                 name: "A",
        //             },
        //             {
        //                 name: "B",
        //             },
        //             {
        //                 name: "C",
        //             },
        //         ],
        //         outputConnectors: [
        //             {
        //                 name: "A",
        //             },
        //             {
        //                 name: "B",
        //             },
        //             {
        //                 name: "C",
        //             },
        //         ],
        //     },

        //     {
        //         name: "Example Node 2",
        //         id: 1,
        //         x: 400,
        //         y: 200,
        //         width: 200,
        //         inputConnectors: [
        //             {
        //                 name: "A",
        //             },
        //             {
        //                 name: "B",
        //             },
        //             {
        //                 name: "C",
        //             },
        //         ],
        //         outputConnectors: [
        //             {
        //                 name: "A",
        //             },
        //             {
        //                 name: "B",
        //             },
        //             {
        //                 name: "C",
        //             },
        //         ],
        //     },

        // ],

        // connections: [
        //     {
        //         source: {
        //             nodeID: 0,
        //             connectorIndex: 1,
        //         },

        //         dest: {
        //             nodeID: 1,
        //             connectorIndex: 2,
        //         },
        //     },
        // ]
    };

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
        var name = prompt("Please enter block name", "");

        var block = {
            name: name,
            data: $scope.chartViewModel.data
        };

        $scope.blocks.push(block);
        $scope.chartViewModel = new flowchart.ChartViewModel([]);
    };

    $scope.add = function(block) {
        if (!$scope.chartViewModel.data.nodes) {
            $scope.chartViewModel.data.nodes = [];
        }
        _.forEach(block.data.nodes, function(item) {
            $scope.chartViewModel.data.nodes.push(item);
        });

        if (!$scope.chartViewModel.data.connections) {
            $scope.chartViewModel.data.connections = [];
        }
        _.forEach(block.data.connections, function(item) {
            $scope.chartViewModel.data.connections.push(item);
        });
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

    //
    // Create the view-model for the chart and attach to the scope.
    //
    $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
}]);