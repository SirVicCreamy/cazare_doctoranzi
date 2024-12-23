# Doctorand Management Application

## Overview
The **Doctorand Management Application** is a full-stack web application designed to manage doctorands' data efficiently. It features a React frontend and a Flask backend, with data stored and manipulated using Excel files. The application supports adding, editing, viewing, and deleting doctorand information, all within a user-friendly interface.

---

## Features
- **Frontend (React):**
  - Responsive and modern UI with light and dark themes.
  - Fullscreen table view with search and sort functionalities.
  - Add/Edit doctorand form with validation.
  - Action buttons (Edit/Delete) for each row.
  - Download table data as a CSV file.

- **Backend (Flask):**
  - RESTful API to handle CRUD operations.
  - Integration with Excel files for persistent storage.

- **Styling:**
  - Mint-themed light mode and emerald dark mode.
  - Frosted glass effects and smooth transitions.

---

## Tech Stack
- **Frontend:** React, Axios
- **Backend:** Flask, Python
- **Storage:** Excel files
- **Styling:** CSS (custom modern design)

---

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.x
- Git

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Setup Backend:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a virtual environment and activate it:
     ```bash
     python -m venv env
     source env/bin/activate  # On Windows: env\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```bash
     flask run
     ```

3. **Setup Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **View Doctorands:**
   - Switch to the "View Doctorands" tab.
   - Use the search bar to find doctorands by name.
   - Sort columns by clicking on column headers.
   - Download the table as a CSV file.

2. **Add/Edit Doctorand:**
   - Switch to the "Add/Edit Doctorand" tab.
   - Fill out the form with the required information.
   - Click "Add" or "Update" to save changes.

3. **Delete Doctorand:**
   - Click the delete button in the actions column.
   - Confirm the deletion in the popup.

---

## Project Structure

```
repository-name/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── doctorands.xlsx  # Storage file
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── style.css
│   │   └── components/
│   │       └── Table.js
│   └── package.json
└── README.md
```
---



