from flask import Flask, request, session, redirect, jsonify
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
from animal import Animal

# obtaining the active MongoClient
client = db_manager()

# obtaining collections/database
db = client['Tail-TrackR']
# for the animal postings
collection = db['postings']


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


# updates page (recently lost animals)
@app.route("/api/get/", methods=["GET"])
# @login_required
def get_all_posts():
    post_list = Animal().getAll(db)
    return jsonify({"Received Information": post_list[0]}), 200

# for image upload
@app.route("/api/upload/", methods=["POST"])
@login_required
def upload_image():
    
    return Animal().postNew(db)

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

    return User().login(db)

# for logout
@app.route("/api/user/logout/", methods=["POST"])
def logout():

    return User().logout()
    
# running the app
if __name__ == "__main__":
    app.run(debug=True, port=5000)