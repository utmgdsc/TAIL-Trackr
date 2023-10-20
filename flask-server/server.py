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

@app.route("/", methods=["GET"])
def home():
    userID = "User1"
    password = "Password1"
    document = {
        "UserID": userID,
        "Password": password
    }
    collection.insert_one(document)

    return {"response": "Complete"}

# for image upload
@app.route("/api/upload/", methods=["POST"])
def upload_image():

    # this line contains the image bytecode, will be sent to google cloud later
    image_data = request.get_data()

    return {"response": "Data Received"}

# for registration
@app.route("/api/register/", methods=["POST"])
def register():
    user_info = request.get_json()
    userID = user_info["username"]
    password = user_info["password"]

    # userID = "User1"
    # password = "Password1"
    document = {
        "UserID": userID,
        "Password": password
    }

    # TODO: add password encoding with hashing and salt
    # TODO: add error handling

    collection.insert_one(document)
    return {"response": f"User successfully registered {userID}"}

# for login
@app.route("/api/login/", methods=["POST"])
def login():
    user_info = request.get_json()

    userID = user_info["username"]
    password = user_info["password"]
    # userID = "User1"
    # password = "Password1"
    document = {
        "UserID": userID,
        "Password": password
    }

    # TODO: add password decoding and compare to original password, using salt
    # TODO: add error handling
    # TODO: add response indicating whether credentials are correct or not, and respective pages to visit


    user = collection.find_one(document)
    if user:
        return {"response": f"User successfully logged in {userID}"}
    else:
        return {"response": "Incorrect credentials"}
    

if __name__ == "__main__":
    app.run(debug=True)