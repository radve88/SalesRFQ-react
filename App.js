import React, { useState, useEffect } from "react";
import { Table, Input, Select, Button, Form, message } from "antd";
import axios from "axios";

const { Option } = Select;

function SalesRFQ() {
    const [salesRFQ, setSalesRFQ] = useState({});
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSalesRFQ(1); // Default Sales RFQ ID (Replace with dynamic ID)
    }, []);

    const fetchSalesRFQ = async (id) => {
        try {
            const salesRes = await axios.get(`http://localhost:5000/salesrfq/${id}`);
            const parcelsRes = await axios.get(`http://localhost:5000/salesrfq/${id}/parcels`);
            setSalesRFQ(salesRes.data);
            setParcels(parcelsRes.data);
            setLoading(false);
        } catch (error) {
            message.error("Failed to fetch data");
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:5000/salesrfq/${salesRFQ.SalesRFQID}/parcels/save`, { parcels });
            message.success("Parcels updated successfully");
        } catch (error) {
            message.error("Failed to save data");
        }
    };

    const handleEdit = (index, field, value) => {
        const updatedParcels = [...parcels];
        updatedParcels[index][field] = value;
        setParcels(updatedParcels);
    };

    const columns = [
        { title: "SalesRFQParcelID", dataIndex: "SalesRFQParcelID", key: "id" },
        { title: "ItemID", dataIndex: "ItemID", key: "item" },
        {
            title: "Item Quantity",
            dataIndex: "ItemQuantity",
            key: "quantity",
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleEdit(index, "ItemQuantity", e.target.value)}
                />
            ),
        },
        {
            title: "UOMID",
            dataIndex: "UOMID",
            key: "uom",
            render: (text, record, index) => (
                <Select value={text} onChange={(value) => handleEdit(index, "UOMID", value)}>
                    <Option value="1">Nos</Option>
                    <Option value="2">Box</Option>
                </Select>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sales RFQ {salesRFQ.Series}</h2>
            <Form layout="vertical">
                <Form.Item label="Customer ID">
                    <Input value={salesRFQ.CustomerID} readOnly />
                </Form.Item>
                <Form.Item label="Supplier ID">
                    <Input value={salesRFQ.SupplierID} readOnly />
                </Form.Item>
                <Form.Item label="Currency">
                    <Input value={salesRFQ.CurrencyID} readOnly />
                </Form.Item>
            </Form>

            <h3>Sales RFQ Parcels</h3>
            <Table columns={columns} dataSource={parcels} loading={loading} rowKey="SalesRFQParcelID" />

            <Button type="primary" onClick={handleSave} style={{ marginTop: "20px" }}>
                Save
            </Button>
        </div>
    );
}

export default SalesRFQ;
