var React = require('react');

var TopBar = React.createClass({
	render: function(){
		return(
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
					TopBar
					</div>
				</div>
			</nav>)
	}
})

module.exports = TopBar;