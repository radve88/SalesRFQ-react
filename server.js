const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "supply_chain"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// API: Get Sales RFQ by ID
app.get("/salesrfq/:id", (req, res) => {
    const salesRFQID = req.params.id;
    const query = "SELECT * FROM tblSalesRFQ WHERE SalesRFQID = ?";
    db.query(query, [salesRFQID], (err, result) => {
        if (err) throw err;
        res.json(result[0]); // Return a single object
    });
});

// API: Get Parcels for Sales RFQ
app.get("/salesrfq/:id/parcels", (req, res) => {
    const salesRFQID = req.params.id;
    const query = "SELECT * FROM tblSalesRFQParcel WHERE SalesRFQID = ?";
    db.query(query, [salesRFQID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// API: Save Edited Parcels
app.post("/salesrfq/:id/parcels/save", (req, res) => {
    const { parcels } = req.body;
    let query = "";
    parcels.forEach(parcel => {
        query += mysql.format(
            "UPDATE tblSalesRFQParcel SET ItemQuantity = ?, UOMID = ? WHERE SalesRFQParcelID = ?; ",
            [parcel.ItemQuantity, parcel.UOMID, parcel.SalesRFQParcelID]
        );
    });

    db.query(query, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error saving data");
        } else {
            res.send("Parcels updated successfully");
        }
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
