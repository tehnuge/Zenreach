var React = require('react');
var Home = require('./home');

var TopBar = React.createClass({
	getInitialState: function(){
		return{
			favorites: 0
		}
	},
	handleFavoritesMinus: function(){
		this.setState({favorites: this.state.favorites - 1})
	},
	handleFavoritesPlus: function(){
		this.setState({favorites: this.state.favorites + 1})
	},
	render: function(){
		return(
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container">
						<div className="navbar-header">
						<b>
							Favorites: {this.state.favorites}
						</b>
						</div>
					</div>
				</nav>
				<Home 	
					favorites={this.state.favorites}
					onFavoritesMinus = {this.handleFavoritesMinus}
					onFavoritesPlus = {this.handleFavoritesPlus} 
				/>
			</div>)
	}
})

module.exports = TopBar;