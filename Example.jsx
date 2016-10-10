import React from "react";
import Remarkable from "remarkable";

var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    getDefaultProps: function () {
        return {
            url: 'json/comments.json'
        }
    },
    loadComments: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (data) {
                console.log(data);
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadComments();
        setInterval(this.loadComments, 2000);
    },
    render: function () {
        return (
            <div className="text-center">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        )
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNode = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                {commentNode}
            </div>
        )
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <form className="commentForm">
                <input type="text" placeholder="Your name"/><br/>
                <input type="text" placeholder="Say something..."/><br/>
                <input type="submit" value="Post"/>
            </form>
        )
    }
});

var Comment = React.createClass({
    getDefaultProps: function () {
        return {
            author: ''
        }
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={rawMarkup(this.props.children)}/>
            </div>
        );
    }
});

function rawMarkup(str) {
    var md = new Remarkable();
    var rawMarkup = md.render(str);

    return {__html: rawMarkup};
}

export default CommentBox;