var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
	getInitialState: function(){
	    return{
	        didFetchData: false,
	        pics: [],
	    }
	},
	componentDidMount: function() {
		$.getJSON(url)
		     .done(function(data) {
		        //success here
		        console.log('data', data)
		        newData = data;
		        this.setState({pics: newData.photos,
		        	didFetchData: true,})
		     }.bind(this))
		     .fail(function() {
		       console.log('GET req failed')
		     });
	},
	render: function(){
		if(this.state.didFetchData === false){
			return null;
		}
		var pic = this.state.pics[0];
		return(
			<div className="container"><img src={pic.image_url} />
			</div>)
	}
})



//document.addEventListener("DOMContentLoaded", function(){
	ReactDOM.render(<Home />, document.getElementById('root'))	
//})