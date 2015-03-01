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
		console.log('run');

		var program = JSON.parse(this.props.programStr.value);
		BreakDownEngine(program);
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

	bindNameChanged: function() {
		var name = this.refs.bindingName.getDOMNode().value;
		this.props.element.refine('bindingName').set(name);
	},

	render: function() {
		var elementType = this.props.element.value.type;
		return (
			<Draggable>
				<div>
					{elementType} <ClickableSpan name="x" onClick={this.onClick} />
				</div>
				<div>
					bind to: <input ref="bindingName" onChange={this.bindNameChanged} />
				</div>
				{React.createElement(elementType)}
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

  render: function() {
		var cursor = ReactCursor.Cursor.build(this);
		var programStrCursor = cursor.refine('programString');
		var elementsCursor = cursor.refine('elements');

		return (
			<div>
				<InterfaceEditorMenu 
					elements={elementsCursor} 
					programStr={programStrCursor}
				/>
				<InterfaceCanvas elements={elementsCursor} />
			</div>
    );
  }
});
