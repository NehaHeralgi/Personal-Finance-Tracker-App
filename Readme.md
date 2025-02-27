# Personal Finance Tracker App

![Personal Finance Tracker](https://img.shields.io/badge/Angular-17-red?style=flat-square&logo=angular) ![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-blueviolet?style=flat-square&logo=dotnet) ![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-lightgrey?style=flat-square&logo=microsoftsqlserver)

## 📌 Overview
The **Personal Finance Tracker App** is a web-based application designed to help users manage their financial transactions efficiently. It allows users to track their **income, expenses, and balance** while offering insightful **reports and charts** for better financial planning.

## ✨ Features
- ✅ **User Authentication** with Identity Framework & JWT.
- ✅ **Add Income & Expense** transactions with category selection.
- ✅ **Dashboard** with financial summary:
  - Pie Chart (Expense vs Income)
  - Bar Chart (Monthly Spending Trend)
  - Line Chart (Balance Growth Over Time)
- ✅ **Transaction Filters** (Category, Date Range, Amount, Type, Search).
- ✅ **Reports Section**:
  - Category Spending Report
  - Monthly Spending Report
- ✅ **Draggable & Resizable Dashboard Layout**.

## 🚀 Tech Stack
### Frontend:
- **Angular 17 (Standalone) 🔥**
- **PrimeNG** (UI Components)
- **Ngx-Charts / Chart.js** (Data Visualization)
- **RxJS & State Management**

### Backend:
- **.NET Core 8.0** (Web API)
- **Entity Framework Core** (Database ORM)
- **SQL Server** (Database)
- **JWT Authentication & Authorization**

## 📂 Folder Structure
```
Personal-Finance-Tracker-App/
│── frontend/          # Angular 17 App
│── backend/           # .NET Core API
│── database/          # SQL Scripts / Migrations
│── README.md          # Project Documentation
```

## 🎯 Installation & Setup
### Backend (.NET Core API)
1. **Clone the repository:**
   ```sh
   git clone https://github.com/NehaHeralgi/Personal-Finance-Tracker-App.git
   cd Personal-Finance-Tracker-App/backend
   ```
2. **Restore dependencies:**
   ```sh
   dotnet restore
   ```
3. **Update `appsettings.json` with SQL Server connection string.**
4. **Run database migrations:**
   ```sh
   dotnet ef database update
   ```
5. **Start the API:**
   ```sh
   dotnet run
   ```

### Frontend (Angular 17)
1. **Navigate to frontend folder:**
   ```sh
   cd ../frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   ng serve
   ```
4. Open **http://localhost:4200/** in the browser.

## 📊 Screenshots (Coming Soon...)


## 🛠️ Contribution
1. Fork the repo 🍴
2. Create a new branch 📌
3. Make your changes ✨
4. Submit a pull request ✅

## 📜 License
This project is **open-source** and available under the **MIT License**.

---
💡 **Developed by [Neha Heralgi](https://github.com/NehaHeralgi/)** 🚀
