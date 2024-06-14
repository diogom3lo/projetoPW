import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import qs from 'query-string';

const PlayerTable = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Number",
            dataIndex: "number",
            key: "number"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image"
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating"
        }
    ];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        products: [],
        pagination: {
            current: 1,
            pageSize: 5,
            total: 0,
        },
    });

    const fetchProducts = (pageSize, current) => {
        const url = `/api/product?${qs.stringify({ limit: pageSize, skip: current - 1 })}`;
    
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((response) => {
            const { products = [], pagination } = response; // Adjust according to your API response structure
    
            setData({
                products: products,
                pagination: {
                    current: current || 1,
                    pageSize: pagination.pageSize || 10,
                    total: pagination.total || 0,
                },
            });

            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    };
    
    useEffect(() => {
        fetchProducts(data.pagination.pageSize, data.pagination.current);

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    const handleTableChange = (pagination) => {
        fetchProducts(pagination.pageSize, pagination.current);
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record._id} // Adjust according to your record structure
            dataSource={data.products}
            pagination={data.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default PlayerTable;
