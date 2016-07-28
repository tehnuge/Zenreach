var React = require('react');
var Tile = require('./tile');

var url = 'https://api.500px.com/v1/photos?feature=popular&sort=created_at&image_size=3&rpp=100&include_store=store_download&include_states=voted&consumer_key=SXgWv6W10tTw058W95DZ4RfQKMTTAc7mwnskbzPY';

var Home = React.createClass({
	getInitialState: function(){
		window.addEventListener("scroll", this.handleScroll);
	    return{
	        didFetchData: false,
	        loadingFlag: false,
	        load: 0,
	        pics: [],
	        sliceEnd: 0
	    }
	},
	getPics: function(){
    //method to fetch comments will concat result to state.comment
		var nextLoad = this.state.load+1; //increase the load count
	 	var newSliceEnd = this.state.sliceEnd + 10;
      if (this.isMounted()) {
        this.setState({
          loadingFlag: false,
          load: nextLoad,
          sliceEnd: newSliceEnd
        });
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
			return (<div>loading...</div>);
		}
		var end = this.state.sliceEnd;
		var PicsNode = this.state.pics.map(function(pic){
			return(
				<Tile key={pic.id}
						image_url = {pic.image_url}
						times_viewed = {pic.times_viewed}
						/>
				)			
		}).slice(0, end);
		return(
			<div className="container row">
				{PicsNode}
			</div>
		)
	}
})

module.exports = Home