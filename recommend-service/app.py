from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from model import get_recommendations

app = Flask(__name__)
CORS(app)

client = MongoClient("MONGO_URI")
db = client["test"]
books_col = db["books"]

import pandas as pd

@app.route("/books_count")
def books_count():
    count = books_col.count_documents({})
    return jsonify({"books_count": count})



@app.route("/recommend", methods=["GET"])
def recommend():
    book_title = request.args.get("title")
    if not book_title:
        return jsonify({"error": "Book title is required"}), 400

    books_list = list(books_col.find({}, {"_id": 0}))
    if not books_list:
        return jsonify({"error": "No books found in database"})
    
    print("Sample book document:", books_list[0])  
    df = pd.DataFrame(books_list)
    print("Columns in dataframe:", df.columns)

    recommendations = get_recommendations(book_title, df)
    return jsonify(recommendations)



if __name__ == "__main__":
    app.run(debug=True,port=5001)
