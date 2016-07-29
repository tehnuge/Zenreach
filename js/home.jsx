var React = require('react');
var Tile = require('./tile');
var _ = require('underscore');
var image_size = 'image_size[]=3&image_size[]=600'
var url = 'https://api.500px.com/v1/photos?feature=popular&sort=created_at&'+image_size+'&rpp=100&include_store=store_download&include_states=voted&consumer_key=SXgWv6W10tTw058W95DZ4RfQKMTTAc7mwnskbzPY';

var Home = React.createClass({
	getInitialState: function(){
		window.addEventListener("scroll", this.handleScroll);
	    return{
	        didFetchData: false,
	        loadingFlag: false,
	        favorited: {},
	        favorites: this.props.favorites,
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
			this.setState({favorited: _.extend(this.state.favorited, {[id]: false})});
			this.props.onFavoritesMinus();
		}else{
			this.setState({favorited: _.extend(this.state.favorited, {[id]: true})});
			this.props.onFavoritesPlus();
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
		//alternate loading image sizes
		var count = count + 1 || 0;
		var end = this.state.sliceEnd;
		var PicsNode = this.state.pics.map(function(pic){
			var a = count % 2;
			return(
				<div key={pic.id}>
					<Tile	
						id = {pic.id}
						name = {pic.name}
						image_url = {pic.image_url[a]}
						times_viewed = {pic.times_viewed}
						onFavorite = {this.favorite.bind(this, pic)}
						favorited = {this.state.favorited[pic.id]  === true}
					/>
				</div>
				)			
		}, this).slice(0, end);
		return(<div className="container">					
						{PicsNode}
				</div>
		)
	}
})

module.exports = Home