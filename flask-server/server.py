from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

app = Flask(__name__)

user = ""
password = ""
with open("credentials.json", "r") as json_file:
    data = json.load(json_file)
    user = data["user"]
    password = data["password"]

uri = f'mongodb+srv://{user}:{password}@login.fwh5tj6.mongodb.net/?retryWrites=true&w=majority'

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

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