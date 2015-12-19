var React = require('react');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var rootUrl = 'http://yourfirebaseAppUrl';
var Header = require('./header');
var List = require('./list');

var App = React.createClass({
    mixins: [ReactFire],
    getInitialState: function(){
	return {
	    items: {}
	};
    },
    componentWillMount: function(){
	this.fb = new FireBase(rootUrl + 'items/');
    	this.bindAsObject(this.fb, 'items');
	this.fb.on('value', this.handleDataLoaded);
    },    
    render: function() {
    	return <div className="row panel panel-default">
      	    <div className="col-md-8 col-md-offset-2">
		<h2 className="text-center"> To-Do-List-D</h2>
		<Header itemStore={this.firebaseRefs.items} />
		<hr />
		<div className={"content" + (this.state.loaded ? 'loaded' : '')}>
		    <List items={this.state.items}/>
		    {this.deleteButton()}
		</div>
	    </div>
    	</div>
    },
    deleteButton: function(){
	if(!this.state.loaded){ return }
	else{
	    return <div className="text-center clear-complete">
	    <hr/>
	    <button
		type="button"
		onClick={this.onDeleteDoneClick}
		className="btn btn-default" >
		Clear Complete
	    </button>
	    </div>
	}
    },
    onDeleteDoneClick : function(){
	for(var key in this.state.items){
	    if(this.state.items[key].done === true){
		this.fb.child(key).remove();
	    }
	}
    },
    handleDataLoaded: function(){
	this.setState({ loaded: true });
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));