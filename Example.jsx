import React from "react";

var Example = React.createClass({
    getInitialState() {
        return {
            name: 'ldk',
            number: 1
        }
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            this.setState({
                number: this.state.number + 1
            });

            if (this.state.number == 5) {
                clearTimeout(this.timer);
            }
        }.bind(this), 1000);
    },

    handleClick: function () {
        this.setState({
            number: this.state.number + 1,
            name: 'song'
        }, function () {
            this.forceUpdate();
            alert('姓名改变');
        });
    },
    render() {
        return (
            <div onClick={this.handleClick}>
                <Name name={this.state.name}/>
                <Age age={this.state.number}/>
            </div>
        );
    }
});

var Name = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            name: 'bedisdover'
        };
    },
    render: function () {
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