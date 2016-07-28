var React = require('react');
var classNames = require('classnames');

var Tile = React.createClass({
	getInitialState: function () {
		return {
				image_url: this.props.image_url,
				times_viewed: this.props.times_viewed,
				isFavorite: false
			};
	},
	render: function(){
		var tileClass = classNames({
			'tile col-md-4': true,
			'favorite': this.state.isFavorite
		})
		return(
			<div>
				<img src={this.state.image_url} className='tile col-md-4'
					 />
			</div>)
	}
})

module.exports = Tile