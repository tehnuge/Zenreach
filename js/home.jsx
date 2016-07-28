var React = require('react');
var Tile = require('./tile');
var _ = require('underscore');

var url = 'https://api.500px.com/v1/photos?feature=popular&sort=created_at&image_size=3&rpp=100&include_store=store_download&include_states=voted&consumer_key=SXgWv6W10tTw058W95DZ4RfQKMTTAc7mwnskbzPY';

var Home = React.createClass({
	getInitialState: function(){
		window.addEventListener("scroll", this.handleScroll);
	    return{
	        didFetchData: false,
	        loadingFlag: false,
	        favorited: {},
	        favorites: 0,
	        sliceEnd: 0,
	        pics: []
	    }
	},
	getPics: function(){
    //Method to chunk off more of the pics array
	 	var newSliceEnd = this.state.sliceEnd + 10;
      if (this.isMounted()) {
        this.setState({
          loadingFlag: false,
          sliceEnd: newSliceEnd
        });
      }
	}, 
	favorite: function (pic) {
		var id = pic.id
		if(this.state.favorited[id] && this.state.favorited[id] === true){
			this.setState({favorited: _.extend(this.state.favorited, {[id]: false}),
				favorites: this.state.favorites - 1});
		}else{
			this.setState({favorited: _.extend(this.state.favorited, {[id]: true}),
				favorites: this.state.favorites + 1});
		}
	},
	handleScroll: function(e){
	  //this function will be triggered if user scrolls
	  var self = this;
	  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){  //user reached at bottom
	    if(!this.state.loadingFlag){  //to avoid multiple request 
	        this.setState({
	          loadingFlag: true,
	        });
	        setTimeout(function(){
	        	self.getPics();
	        }, 1000);

	    }
	  }
	},
	componentDidMount: function() {
		$.getJSON(url)
		     .done(function(data) {
		        //success here
		        console.log('data', data)
		        this.setState({pics: data.photos,
		        	didFetchData: true,})
		     }.bind(this))
		     .fail(function() {
		       console.log('GET request failed');
		     });
		this.getPics();
	},
	render: function(){
		if(this.state.didFetchData === false){
			return (<div className='row col-md-12 text-center'>loading...</div>);
		}

		var end = this.state.sliceEnd;
		var PicsNode = this.state.pics.map(function(pic){
			return(
				<div key={pic.id}>
					<Tile	id = {pic.id}
							image_url = {pic.image_url}
							name = {pic.name}
							times_viewed = {pic.times_viewed}
							onFavorite = {this.favorite.bind(this, pic)}
							favorited = {this.state.favorited[pic.id]  === true}
							/>
				</div>
				)			
		}, this).slice(0, end);
		return(
			<div className="container row">
				{PicsNode}
			</div>
		)
	}
})

module.exports = Home