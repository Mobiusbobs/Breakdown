/** @jsx React.DOM */
var HelloComponent = React.createClass({
  // propTypes: {
  //   fname : React.PropTypes.string.isRequired,
  //   lname : React.PropTypes.string.isRequired
  // },
  render: function() {
    return <span>Hello world</span>;
    // return <span>Hello {this.props.fname} {this.props.lname}</span>;
  }
})

app.value('HelloComponent', HelloComponent);
