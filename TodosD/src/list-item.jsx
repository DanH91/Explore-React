var React = require('react');
var FireBase = require('firebase');
var rootUrl = 'http://yourfirebaseAppUrl';

module.exports = React.createClass({
    getInitialState: function(){
	return {
	    text: this.props.item.text,
	    done: this.props.item.done,
	    textChange: false 
	};
    },
    componentWillMount: function(){
	this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
    },
    render: function(){
	return <div className="input-group">
	    <span className="input-group-addon">
		<input
		    checked={this.state.done}
		    onChange={this.handleDoneChange}
		    type="checkbox"
		/>
	    </span>
	    <input type="text"
		   className="form-control"
		   value={this.state.text}
	onChange={this.handleTextChange}
	disabled={this.state.done}
	    />
	<span className="input-group-btn">
	    {this.changesButtons()}
		<button
		    className="btn btn-default"
		    onClick={this.handleDeleteClick}
		>
		    Delete
		</button>
	    </span>
	</div> 
    },
    changesButtons:function(){
	if(!this.state.textChanged){
	    return null;
	}
	else {
	return <span>
	    <button
		onClick={this.handleSaveClick}
		className="btn btn-default"
	    >Save</button>
	    <button
		onClick={this.handleUndoClick}
		className="btn btn-default"
	    >Undo</button>
	</span>;
	}
    },
    handleSaveClick: function(){
	this.fb.update({text: this.state.text});
	this.setState({ textChanged: false});
    },
    handleUndoClick: function(event){
	this.setState({ text: this.props.item.text, textChanged: false });
    },
    handleTextChange: function(event){
	this.setState({ text: event.target.value, textChanged: true});
	
    },
    handleDeleteClick: function(){
	this.fb.remove();
    },
    handleDoneChange: function(event){
	var update = { done: event.target.checked};
	this.setState(update);
	this.fb.update(update);
    }
});
