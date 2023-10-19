from flask import Flask, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('127.0.0.1', 27017)
db = client['Tail-TrackR']
collection = db['User']

@app.route("/api/upload", methods=["POST"])
def upload_image():

    # this line contains the image bytecode, will be sent to google cloud later
    image_data = request.get_data()

    return {"response": "Data Received"}

# TODO Wrap in some request from client to login or sign up

userID = "User1"
password = "Password1"
document = {
    "UserID": userID,
    "Password": password
}
collection.insert_one(document)

if __name__ == "__main__":
    app.run(debug=True)
    client.close()