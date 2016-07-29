var React = require('react');
var classNames = require('classnames');

var Tile = React.createClass({
	getInitialState: function () {
		return {
				image_url: this.props.image_url,
				times_viewed: this.props.times_viewed,
				mouseStatus: false,
			};
	},
	handleFavorite: function(){
		this.props.onFavorite();
	},
	handleMouse: function(){
		this.setState({mouseStatus: !this.state.mouseStatus})
	},
	render: function(){
		var tileClass = classNames({
			favorite: this.props.favorited,
			'tile': true,
			 'col-md-4': true,
		});
		var textClass = classNames({
			mouse: this.state.mouseStatus
		});
		return(
			<div className= {tileClass}>

				<img className="center-block"
					src={this.state.image_url}  
					onClick = {this.handleFavorite}
					onMouseEnter = {this.handleMouse}
					onMouseLeave = {this.handleMouse}
					 />
				<h4><span className={textClass}>views: {this.state.times_viewed}</span></h4>
				<br />
				<b className="center-block text-center">{this.props.name}</b>
			</div>)
	}
})

module.exports = Tile