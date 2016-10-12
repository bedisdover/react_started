import React from "react";

var FilterableProductTable = React.createClass({
    loadProductsFromServer: function () {
        jQuery.ajax({
            url: 'json/products.json',
            dataType: 'json',
            type: 'POST',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {
            data: []
        }
    },
    render: function () {
        return (
            <div>
                <SearchBar />
                <ProductTable data={this.state.data}/>
            </div>
        )
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <form >
                <input type="text" placeholder="Search..."/>
                <input type="checkbox"/> Only show products in stock
            </form>
        )
    }
});

var ProductTable = React.createClass({
    render: function () {
        var products = [];
        /*TODO 干掉*/
        var products = this.props.data.map(function (product) {
            console.log(123);
            return (
                <ProductRow

                />
            )
        });

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <ProductCategoryRow />
                    {products}
                    <ProductCategoryRow />

                    </tbody>
                </table>
            </div>
        )
    }
});

var ProductCategoryRow = React.createClass({
    render: function () {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
});

var ProductRow = React.createClass({
    render: function () {
        var className = this.props.stocked ? 'stocked' : 'un-stocked';

        return (
            <tr>
                <td className={className}>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
});

export default FilterableProductTable;