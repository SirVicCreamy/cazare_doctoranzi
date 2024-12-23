from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)
DATA_FILE = "doctorands.xlsx"

if not os.path.exists(DATA_FILE):
    columns = [
        "Full Name", "Mother's Name", "Father's Name", "Phone Number", "Dormitory",
        "Room Number", "Email", "Date of Birth", "Nationality", "Passport Number",
        "Date of Issue", "Date of Expiry", "Issuing Authority", "Validated As Student"
    ]
    pd.DataFrame(columns=columns).to_excel(DATA_FILE, index=False)

@app.route('/doctorands', methods=['GET'])
def get_doctorands():
    if not os.path.exists(DATA_FILE) or os.stat(DATA_FILE).st_size == 0:
        return jsonify([])  
    df = pd.read_excel(DATA_FILE)
    return jsonify(df.to_dict(orient='records'))


@app.route('/doctorands', methods=['POST'])
def add_doctorand():
    data = request.json
    df = pd.read_excel(DATA_FILE)
    df = pd.concat([df, pd.DataFrame([data])], ignore_index=True)
    df.to_excel(DATA_FILE, index=False)
    return jsonify({'message': 'Doctorand added successfully.'}), 201

@app.route('/doctorands/<int:index>', methods=['PUT'])
def update_doctorand(index):
    data = request.json
    df = pd.read_excel(DATA_FILE)
    if index < 0 or index >= len(df):
        return jsonify({'error': 'Invalid index.'}), 404
    for key, value in data.items():
        if key in df.columns:
            df.at[index, key] = value
    df.to_excel(DATA_FILE, index=False)
    return jsonify({'message': 'Doctorand updated successfully.'})

@app.route('/doctorands/<int:index>', methods=['DELETE'])
def delete_doctorand(index):
    df = pd.read_excel(DATA_FILE)
    if index < 0 or index >= len(df):
        return jsonify({'error': 'Invalid index.'}), 404
    df = df.drop(index).reset_index(drop=True)
    df.to_excel(DATA_FILE, index=False)
    return jsonify({'message': 'Doctorand deleted successfully.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

