import React from "react";
import Remarkable from "remarkable";

var CommentBox = React.createClass({
    loadComments: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (data) {
                console.log(data);
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;

        comment.id = Date.now();
        var newComments = comments.concat(comment);

        this.setState({data: newComments});
    },
    getInitialState: function () {
        return {
            data: []
        };
    },
    getDefaultProps: function () {
        return {
            url: 'json/comments.json'
        }
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
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
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
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value})
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if (!author || !text) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    getInitialState: function () {
        return {
            author: '',
            text: ''
        }
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author}
                       onChange={this.handleAuthorChange}/><br/>
                <input type="text" placeholder="Say something..." value={this.state.text}
                       onChange={this.handleTextChange}/><br/>
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

/**
 * 使用markdown样式渲染文本
 * @param str
 * @returns {{__html: String}}
 */
function rawMarkup(str) {
    var md = new Remarkable();
    var rawMarkup = md.render(str);

    return {__html: rawMarkup};
}

export default CommentBox;