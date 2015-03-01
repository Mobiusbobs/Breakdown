/** @jsx React.DOM */

var ClickableSpan = React.createClass({
	onClick: function() {
		this.props.onClick(this.props.name);
	},
	render: function() {
		return <span className="label label-default" onClick={this.onClick}>
			{this.props.name}
		</span>;
	}
});

var Panel = React.createClass({
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					{this.props.children}
				</div>
			</div>
		);
	}
});


var InterfaceEditorMenu = React.createClass({
	createUI: function(elementName) {
		console.log('create ' + elementName);
		this.props.elements.push([{
			type: elementName,
			id: Date.now()
		}]);
	},

	run: function() {
		var program = JSON.parse(this.props.programStr.value);
		this.props.runWithProgram(program);
	},

	programChange: function(e) {
		var programString = this.refs.programArea.getDOMNode().value;
		this.props.programStr.set(programString);
	},

	render: function() {
    var style = {
      height: "100%"
    };

		var programString = this.props.programStr.value;

		return (
			<div className="col-md-3" style={style}>
				<Panel>
					<ClickableSpan name="run" onClick={this.run} />
				</Panel>
				<Panel>
					<div>Add UI</div>
					<ClickableSpan name="textarea" onClick={this.createUI} />
				</Panel>
				<Panel>
					<div>Program</div>
					<textarea onChange={this.programChange} 
										ref="programArea"
										value={programString} />
				</Panel>
			</div>
		);
	}
});

// TODO use position from props
var Draggable = React.createClass({
	getInitialState: function() {
		return {
			x: 0,
			y: 0
		};
	},

	onDragStart: function(e) {
		this.setState({
			lastDragX: e.pageX,
			lastDragY: e.pageY
		});
	},

	onDrag: function(e) {
		this.setState({
			x: this.state.x + e.pageX - this.state.lastDragX,
			y: this.state.y + e.pageY - this.state.lastDragY,
			lastDragX: e.pageX,
			lastDragY: e.pageY
		});
	},

	render: function() {
		var style = {
			backgroundColor: "white",
			position: "absolute",
			left: this.state.x + "px",
			top: this.state.y + "px"
		};

		return (
			<div 	draggable 
						style={style}
						onDragStart={this.onDragStart}
						onDrag={this.onDrag}>
				{this.props.children}
			</div>
		);
	}
});

var DraggableElement = React.createClass({
	onClick: function() {
		console.log('remove');

		var current = this.props.element.value;
		this.props.elements.
		apply(function(elements) {
			return _.filter(elements, function(e) {
				return e != current;
			});
		});
	},

	onChange: function() {
		var value = this.refs.ele.getDOMNode().value;
		// TODO parse value
		var arr = _.map(value.split('\n'), function(s) {
			return parseInt(s, 10);
		});

		this.props.element.refine('value').set(arr);
	},

	bindNameChanged: function() {
		var name = this.refs.bindingName.getDOMNode().value;
		this.props.element.refine('bindingName').set(name);
	},

	render: function() {
		var elementCursor = this.props.element;
		var elementType = elementCursor.value.type;
		var result = elementCursor.refine('result').value;
		var elementProps = {
			ref: "ele",
			onChange: this.onChange
		};

		if (result) {
			elementProps.value = result;
		}

		return (
			<Draggable>
				<div>
					{elementType} <ClickableSpan name="x" onClick={this.onClick} />
				</div>
				<div>
					bind to: <input ref="bindingName" onChange={this.bindNameChanged} />
				</div>
				{React.createElement(elementType, elementProps)}
			</Draggable>
		);
	}
});

var InterfaceCanvas = React.createClass({
	allowDrop: function(e) {
		e.preventDefault();
	},

	render: function() {
    var style = {
      height: "100%"
		};

		var elementsCursor = this.props.elements;

		var elements = elementsCursor.value.map(function(e, i) {
			return (
				<DraggableElement key={e.id}
					elements={elementsCursor}
					element={elementsCursor.refine(i)}	/>
			);
		}.bind(this));

		return (
			<div className="col-md-9" style={style}>
				<div style={style} onDragOver={this.allowDrop}>
					{elements}
				</div>
			</div>
		);
	}
});

var InterfaceEditor = React.createClass({
	getInitialState: function() {
		return {
			elements: [],
			programString: "{}",
		};
	},

	// componentWillReceiveProps: function(nextProp) {
	// 	this.setState({
	// 		programString: nextProp.program
	// 	});
	// },

	run: function(program) {
		console.log('run');

		var cursor = ReactCursor.Cursor.build(this);

		// do binding here
		this.state.elements.forEach(function(ele, i) {
			var bindingName = ele.bindingName;
			if (bindingName) {
				program.bindings = program.bindings || [];
				program.bindings[bindingName] = function (result) {
					if (result) {
						cursor.refine('elements', i, 'result').set(result);
					}

					return ele.value;
				};
			}
		});

		// program.bindings

		// TODO this shouldn't belong to view
		BreakDownEngine(program);
	},

  render: function() {
		var cursor = ReactCursor.Cursor.build(this);
		var programStrCursor = cursor.refine('programString');
		var elementsCursor = cursor.refine('elements');

		return (
			<div>
				<InterfaceEditorMenu 
					runWithProgram={this.run}
					elements={elementsCursor} 
					programStr={programStrCursor}
				/>
				<InterfaceCanvas elements={elementsCursor} />
			</div>
    );
  }
});
