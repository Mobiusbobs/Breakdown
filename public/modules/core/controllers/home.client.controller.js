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
.controller('HomeController', ['$scope', '$http', 'Authentication', 'prompt', function ($scope, $http, Authentication, prompt) {
    $scope.authentication = Authentication;

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
        },
        {
            name: 'pow',
            data: {
                nodes: [
                    {
                        name: '^',
                        type: 'pow',
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
            name: 'eachMinus',
            data: {
                nodes: [
                    {
                        name: 'eachMinus',
                        type: 'eachMinus',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'array' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'array' },
                        ]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'eachPower',
            data: {
                nodes: [
                    {
                        name: 'eachPower',
                        type: 'eachPower',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'array' },
                            { name : 'num'}
                        ], 
                        outputConnectors: [
                            { name : 'array' },
                        ]
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'sum',
            data: {
                nodes: [
                    {
                        name: 'sum',
                        type: 'sum',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'array' }
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
            name: 'avg',
            data: {
                nodes: [
                    {
                        name: 'avg',
                        type: 'ave',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'array' }
                        ], 
                        outputConnectors: [
                            { name : 'num' },
                        ]
                    }
                ], 
                connections: []
            }
        },{
            name: 'length',
            data: {
                nodes: [
                    {
                        name: 'length',
                        type: 'length',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : 'array' }
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
            name: 'output',
            data: {
                nodes: [
                    {
                        name: 'output',
                        type: 'data',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [
                            { name : '' }
                        ], 
                        outputConnectors: []
                    }
                ], 
                connections: []
            }
        },
        {
            name: 'expedia_api',
            data: {
                nodes: [
                    {
                        name: 'expedia_api',
                        type: 'mappingData',
                        id: nextNodeID++,
                        x: 0,
                        y: 0,
                        width: 125,
                        inputConnectors: [], 
                        outputConnectors: [
                            { name : '' }
                        ]
                    }
                ], 
                connections: []
            }
        }
    ];

    $scope.blocks = $scope.authentication.user.projects;

    var chartDataModel = { nodes: [], connections: [] };
    $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);

    //
    // Code for the delete key.
    //
    // var deleteKeyCode = 46;

    // //
    // // Code for control key.
    // //
    // var ctrlKeyCode = 65;

    // //
    // // Set to true when the ctrl key is down.
    // //
    // var ctrlDown = false;

    // //
    // // Code for A key.
    // //
    // var aKeyCode = 17;

    // //
    // // Code for esc key.
    // //
    // var escKeyCode = 27;

    //
    // Selects the next node id.
    //
    var nextNodeID = 100;

    // //
    // // Event handler for key-down on the flowchart.
    // //
    // $scope.keyDown = function (evt) {

    //     if (evt.keyCode === ctrlKeyCode) {

    //         ctrlDown = true;
    //         evt.stopPropagation();
    //         evt.preventDefault();
    //     }
    // };

    // //
    // // Event handler for key-up on the flowchart.
    // //
    // $scope.keyUp = function (evt) {

    //     if (evt.keyCode === deleteKeyCode) {
    //         //
    //         // Delete key.
    //         //
    //         $scope.chartViewModel.deleteSelected();
    //     }

    //     if (evt.keyCode == aKeyCode && ctrlDown) {
    //         // 
    //         // Ctrl + A
    //         //
    //         $scope.chartViewModel.selectAll();
    //     }

    //     if (evt.keyCode == escKeyCode) {
    //         // Escape.
    //         $scope.chartViewModel.deselectAll();
    //     }

    //     if (evt.keyCode === ctrlKeyCode) {
    //         ctrlDown = false;

    //         evt.stopPropagation();
    //         evt.preventDefault();
    //     }
    // };

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

        $http
        .post('/blocks', {blocks: $scope.blocks})
        .success(function(data, status, headers, config) {
            $scope.authentication.user = data;
        })
        .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    };

    $scope.add = function(block) {
        if (block.name === 'num' || block.name === 'array') {
            var name = prompt('Enter an input name:', 'x');
            block.data.nodes[0].name = name;
            if(!isNaN(parseFloat(name)) && isFinite(name)) {
                block.data.nodes[0].value = parseFloat(name);
            }
        }

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
        $scope.outJSON = {
            blockDefs : {
                data : "function(a) { return a; }",
                plus : "function(a, b) { return a + b; }",
                minus : "function(a, b) { return a - b; }",
                divide : "function(a, b) { return a / b; }",
                
                length : "function(a) { return a.length }",
                sum : "function(a) { return _.reduce(a, function(x, y) { return x + y; }, 0); }",

                each : "function(a, f) { return P.resolve(a).map(f); }",

                pow : "Math.pow",

                ave : {
                  numOfArgs : 1,
                  blocks : [
                    {
                      name : "sum",
                      type : "sum"
                    },
                    {
                      name : "num",
                      type : "length"
                    },
                    {
                      name : "/",
                      type : "divide",
                      isOutput : true
                    }
                  ], 

                  links : [
                    {
                      src : "arg0",
                      dest : "sum"
                    },
                    {
                      src : "arg0",
                      dest : "num"
                    },
                    {
                      src : "sum",
                      dest : "/:0"
                    },
                    {
                      src : "num",
                      dest : "/:1"
                    }
                  ]
                },

                eachPower : {
                  numOfArgs : 2,
                  blocks : [
                    {
                      name : "partialPow",
                      type : "partial",
                      base : "pow"
                    },
                    {
                      name : "each",
                      type : "each",
                      isOutput : true
                    }
                  ], 

                  links : [
                    {
                      src : "arg0",
                      dest : "each:0"
                    },
                    {
                      src : "arg1",
                      dest : "partialPow:1"
                    },
                    {
                      src : "partialPow",
                      dest : "each:1"
                    }
                  ]
                },

                eachMinus : {
                  numOfArgs : 2,
                  blocks : [
                    {
                      name : "partialMinus",
                      type : "partial",
                      base : "minus"
                    },
                    {
                      name : "each",
                      type : "each",
                      isOutput : true
                    }
                  ], 

                  links : [
                    {
                      src : "arg0",
                      dest : "each:0"
                    },
                    {
                      src : "arg1",
                      dest : "partialMinus:1"
                    },
                    {
                      src : "partialMinus",
                      dest : "each:1"
                    }
                  ]
                },

                combine : "function(a, b) { return [a, b]; }",
                request : "function(url) { return P.resolve($.get(url)); }",
                parseJSON : "JSON.parse",
                get : "function(a, field) { return a[field]; }",

                mappingData: {
                  numOfArgs : 1,
                  blocks : [
                    {
                      name : "centerString",
                      type : "data",
                      value : "center"
                    },
                    {
                      name : "nameString",
                      type : "data",
                      value : "name"
                    },
                    {
                      name : "getCenter",
                      type : "get"
                    },
                    {
                      name : "getName",
                      type : "get"
                    },
                    {
                      name : "combine",
                      type : "combine",
                      isOutput : true
                    }
                  ],
                  links : [
                    {
                      src : "arg0",
                      dest : "getCenter:0"
                    },
                    {
                      src : "centerString",
                      dest : "getCenter:1"
                    },
                    {
                      src : "arg0",
                      dest : "getName:0"
                    },
                    {
                      src : "nameString",
                      dest : "getName:1"
                    },
                    {
                      src : "getName",
                      dest : "combine:0"
                    },
                    {
                      src : "getCenter",
                      dest : "combine:1"
                    }
                  ]
                }
            }
        };

        var map = {};

        $scope.outJSON.blocks = _.map($scope.chartViewModel.nodes, function(item) {    
            if (item.data.type === 'data') {
                map[item.data.id] = item.data.name;
            } else {
                map[item.data.id] = item.data.id; 
            }

            return {
                name: map[item.data.id],
                type: item.data.type,
                value: item.data.value
            };
        });

        $scope.outJSON.links = _.map($scope.chartViewModel.connections, function(item) {
            return {
                src: map[item.data.source.nodeID],
                dest: map[item.data.dest.nodeID] + ':' + item.data.dest.connectorIndex
                // src: item.data.source.nodeID,
                // dest: item.data.dest.nodeID + ':' + item.data.dest.connectorIndex
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