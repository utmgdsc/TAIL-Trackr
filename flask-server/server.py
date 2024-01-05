from flask import Flask, request, session, redirect, jsonify, url_for
from flask_cors import CORS, cross_origin
from functools import wraps
from db_manager import db_manager
import os
from dotenv import load_dotenv
from flask_mail import Mail, Message

load_dotenv()

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = str(os.getenv("secret_key"))
CORS(app)

app.config["MAIL_SERVER"] = "smtp.office365.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = "voraadev@outlook.com"
app.config["MAIL_PASSWORD"] = str(os.getenv("email_pass"))
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False

mail = Mail(app)

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
        print(session)
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
@app.route("/api/get/all", methods=["GET"])
def get_all_posts():
    animal = Animal().getAll(db)
    return jsonify({"Received Information": animal}), 200

# for image upload
@app.route("/api/upload/", methods=["POST"])
def upload_post():
    print('reached here')
    return Animal().postNew(db)


# for image classification
@app.route("/api/classify/", methods=["POST"])
def classify_post():
    return Animal().getFeatures()

# to ensure that user's email is verified
@app.route("/api/verify/", methods=["POST"])
def verifyEmail():
    return User().verifyEmail(db)


# for registration
@app.route("/api/user/register/", methods=["POST"])
def register():
    print("registering")
    output = User().register(db)
    print("registered")

    if output[1] >= 400:
        return output

    # sending verification email
    msg = Message("Verify your email address", sender="voraadev@outlook.com", recipients=[session["user"]["email"]])

    # user email verification
    baseURL = "http://localhost:3000"
    userID = session["user"]["_id"]

    link = baseURL + "/confirm_email?id=" + userID
    msg.body = f"Please verify your email by clicking the following link: {link}"
    mail.send(msg)
    
    return output

# for login
@app.route("/api/user/login/", methods=["POST"])
def login():

    return User().login(db)

# # for logout
@app.route("/api/user/logout/", methods=["POST"])
def logout():
    return User().logout()

# running the app
if __name__ == "__main__":
    app.run(debug=True, port=5000)