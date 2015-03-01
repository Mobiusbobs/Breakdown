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

var InterfaceEditorMenu = React.createClass({
	createUI: function(elementName) {
		console.log('create ' + elementName);
		this.props.elements.push(["hello world"]);
	},

	render: function() {
    var style = {
      height: "100%"
    };

		return (
			<div className="col-md-3" style={style}>
				<div className="panel panel-default">
					<div className="panel-body">
						<ClickableSpan name="textarea" onClick={this.createUI} />
					</div>
				</div>
			</div>
		);
	}
});

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
			return <Draggable key={i}>{e}</Draggable>;
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
			elements: []
		};
	},

  render: function() {
		var cursor = ReactCursor.Cursor.build(this);
		var elements = cursor.refine('elements');

		return (
			<div>
				<InterfaceEditorMenu elements={elements} />
				<InterfaceCanvas elements={elements} />
			</div>
    );
  }
});
