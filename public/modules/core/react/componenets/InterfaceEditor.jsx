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
			type: elementName
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

var InterfaceCanvas = React.createClass({
	allowDrop: function(e) {
		e.preventDefault();
	},

	render: function() {
    var style = {
      height: "100%"
    };

		var elements = this.props.elements.value.map(function(e, i) {
			return (
				<Draggable key={i}>
					<div>{e.type}</div>
					{React.createElement(e.type)}
				</Draggable>
			);
		});

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
		var elementsCursor = cursor.refine('elements');
		var programStrCursor = cursor.refine('programString');

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
