from flask import Flask, request
from flask_cors import CORS
from db_manager import db_manager

# added cors in case we change route in the future
app = Flask(__name__)
CORS(app)

from user import User

# obtaining the active MongoClient
client = db_manager()

# obtaining collections/database
db = client['Tail-TrackR']
collection = db['User']


# home route
@app.route("/", methods=["GET"])
def home():

    return {"response": "Route is connected"}

# for image upload
@app.route("/api/upload/", methods=["POST"])
def upload_image():

    # this line contains the image bytecode, will be sent to google cloud later
    image_data = request.get_data()

    return {"response": "Data Received"}

# for registration
@app.route("/api/user/register/", methods=["POST"])
def register():
    return User().register(db)

# for login
@app.route("/api/user/login/", methods=["POST"])
def login():
    # TODO: add password decoding and compare to original password, using salt
    # TODO: add error handling
    # TODO: add response indicating whether credentials are correct or not, and respective pages to visit

    return {"response": "Incorrect credentials"}
    
# running the app
if __name__ == "__main__":
    app.run(debug=True, port=5000)