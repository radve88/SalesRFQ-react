# SalesRFQ-react

Step 1: Backend (Node.js + Express + MySQL)
We'll set up a Node.js Express backend with MySQL to:
✅ Fetch Sales RFQ (Master) and its Parcels (Detail)
✅ Save edited parcel data


.1 Install Dependencies

npm init -y

npm install express mysql cors body-parser


1.2 Create server.js

code uploaded inrepo


Step 2: Frontend (React + Ant Design)
We'll use Ant Design for:
✅ Dropdowns, date pickers, and input fields
✅ Editable table for Parcels

2.1 Install Dependencies

npx create-react-app salesrfq-frontend

cd salesrfq-frontend

npm install antd axios

2.2 Create App.js

code already uploaded on repo


Step 3: Running the Application

Start MySQL Server

node server.js

Start Frontend

npm start

Final Features
✅ Loads Sales RFQ details (Customer, Supplier, Currency)
✅ Editable Parcels Table (Inline editing for Quantity & UOM)
✅ Save button to commit changes

This should match your MS Access master-detail form! Let me know if any tweaks are needed.









Ensure MySQL is running and the supply_chain database is created.
