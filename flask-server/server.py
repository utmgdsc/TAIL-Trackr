from flask import Flask, request, session, redirect
from flask_cors import CORS
from functools import wraps
from db_manager import db_manager
import os
from dotenv import load_dotenv

load_dotenv()

# added cors in case we change route in the future
app = Flask(__name__)
app.secret_key =  os.getenv("secret_key") # add into .env
CORS(app)

from user import User

# obtaining the active MongoClient
client = db_manager()

# obtaining collections/database
db = client['Tail-TrackR']
collection = db['User']


# login authentication decorator (huge shoutout to youtube lol)
# just add "@login_required" under the route that needs to be login authenticated
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if "logged_in" in session:
            return f(*args, **kwargs)
        else:
            return redirect("/")
    return wrap

# home route
@app.route("/", methods=["GET"])
def home():

    return {"response": "Route is connected"}

# for image upload

@app.route("/api/upload/", methods=["POST"])
@login_required
def upload_image():

    # this line contains the image bytecode, will be sent to google cloud later
    image_data = request.get_data()

    return {"response": "Data Received"}

# for registration
@app.route("/api/user/register/", methods=["POST"])
def register():
    print("registering")
    output = User().register(db)
    print("registered")
    print(session)
    return output

# for login
@app.route("/api/user/login/", methods=["POST"])
def login():
    # TODO: add password decoding and compare to original password, using salt
    # TODO: add error handling
    # TODO: add response indicating whether credentials are correct or not, and respective pages to visit

    return User().login(db)

# for logout
@app.route("/api/user/logout/", methods=["POST"])
def logout():
    # TODO: add password decoding and compare to original password, using salt
    # TODO: add error handling
    # TODO: add response indicating whether credentials are correct or not, and respective pages to visit

    return User().logout()
    
# running the app
if __name__ == "__main__":
    app.run(debug=True, port=5000)