import React from "react";

var Example = React.createClass({
    getInitialState() {
        return {
            number: 1
        }
    },
    handleClick: function () {
        this.setState({number: this.state.number + 1});
    },
    render() {

        return (
            <div onClick={this.handleClick}>
                <Name name="bedisdover"/>
                <Age age={this.state.number}/>
            </div>
        );
    }
});

var Name = React.createClass({
    render() {
        return (
            <p>{this.props.name}</p>
        );
    }
});

var Age = React.createClass({
    getDefaultProps() {
        return {
            age: 20
        }
    },
    render() {
        return (
            <p>{this.props.age}</p>
        );
    }
});

export default Example;