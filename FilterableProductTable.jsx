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
        var products = this.props.data.map(function (product) {
            return (
                /*FIXME 。。。*/
                <ProductRow category={product.category}
                            price={product.price}
                            stocked={product.stocked}
                            name={product.name}
                            key={product.name}
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
                    <ProductRow />
                    <ProductRow />
                    <ProductRow />
                    <ProductCategoryRow />
                    <ProductRow />
                    <ProductRow />
                    <ProductRow />
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
                <td colSpan="2">{this.props.name}</td>
            </tr>
        )
    }
});

var ProductRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
});

export default FilterableProductTable;