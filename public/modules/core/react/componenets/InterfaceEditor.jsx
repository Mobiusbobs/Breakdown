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
		var v = this.props.nested.refine('n').pendingValue();
		this.props.nested.refine('n').set(v + 1);
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

var InterfaceCanvas = React.createClass({
	render: function() {
    var style = {
      height: "100%"
    };

		return (
			<div className="col-md-9" style={style}>
				<div style={style}>
					{this.props.nested.refine('n').value}
				</div>
			</div>
		);
	}
});

var InterfaceEditor = React.createClass({
	getInitialState: function() {
		return {
			nested: {
				n: 0
			},
			elements: []
		};
	},

  render: function() {
		var cursor = ReactCursor.Cursor.build(this);

		return (
			<div>
				<InterfaceEditorMenu nested={cursor.refine('nested')} />
				<InterfaceCanvas elements={this.state.elements} nested={cursor.refine('nested')} />
			</div>
    );
  }
});
