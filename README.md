# Clinic Management System 🏥

Clinic Management System is a full-stack web application designed to simplify clinic operations.  
It provides **role-based dashboards** for Admin, Doctor, Receptionist, and Patient, allowing easy management of **appointments, slots, patient records, billing, and reporting**.

---

## 🚀 Features
- Role-based authentication & dashboards  
- Appointment booking, rescheduling, and cancellation  
- Patient profiles and medical history management  
- Doctor dashboard for appointments & prescriptions  
- Receptionist module for managing slots & schedules  
- Automated billing & invoice generation  
- Reports and analytics for admin  

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express  
- **Frontend:** HTML, CSS, Bootstrap, JavaScript  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT  

---

## ⚡ Getting Started
```bash
1. Clone the Repository

git clone https://github.com/GANESHSN20/clinic_management_system.git
cd clinic_management_system

2. Install Dependencies

npm install

3. Setup Environment Variables

Create a `.env` file in the project root and add the following:
- `PORT` → Port number to run the server (e.g., 3000)
- `MONGO_URI` → MongoDB connection string
- `SECRET_KEY` → Secret key for authentication
- `ADMIN_PASSWORD`→ password field for ADMIN register
- `ADMIN_USER_NAME` → username field for ADMIN register
- `ADMIN_EMAIL` → email field for ADMIN register

4. Run the Application

npm start

```
Visit the live project 👉 [http://localhost:3000](http://localhost:3000)  


## 👥 User Roles

- **Admin** → Manage users, view reports

- **Receptionist** → Manage appointments & slots

- **Doctor** → View patients & update medical records

- **Patient** → Book and manage own appointments

## 🧑‍🤝‍🧑 Team Members

**Syeda Umme Kulsum** and
**Ganesh S N**
, both team members contributed equally to all features and testing.

## 📜 License

This project is licensed under the **MIT** License.
See the license details [here](LICENSE) .