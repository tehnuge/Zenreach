var React = require('react');
var Home = require('./home');

var TopBar = React.createClass({
	render: function(){
		return(
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
						TopBar
						</div>
					</div>
				</nav>
				<Home />
			</div>)
	}
})

module.exports = TopBar;