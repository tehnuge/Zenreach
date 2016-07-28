var React = require('react');
var classNames = require('classnames');

var Tile = React.createClass({
	getInitialState: function () {
		return {
				image_url: this.props.image_url,
				times_viewed: this.props.times_viewed,
			};
	},
	handleFavorite: function(){
		this.props.onFavorite();
	},
	render: function(){
		var tileClass = classNames({
			favorite: this.props.favorited,
			'tile': true,
			 'col-md-4': true,
		})
		return(
			<div className= {tileClass}>
				<img className="center-block"
					src={this.state.image_url}  
					onClick = {this.handleFavorite}
					onMouseEnter = {this.handleMouse}
					 />

				<br />
				<b className="center-block text-center">{this.props.name}</b>
			</div>)
	}
})

module.exports = Tile