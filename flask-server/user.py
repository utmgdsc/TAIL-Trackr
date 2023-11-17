from flask import Flask, request, jsonify
from passlib.hash import pbkdf2_sha256
import uuid
import re

class User:
    def validate_email(self, email):
        # Use a regular expression to check if the email has a valid format
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, email)

    def validate_password(self, password):
        return len(password) >= 8


    def register(self, db):
        # the response data
        data = dict(request.json)

                # Validate email format
        if not self.validate_email(data["email"]):
            return jsonify({"Error": "Invalid email format"}), 400

        # Validate password length
        if len(data["password"]) < 8:
            return jsonify({"Error": "Password must be at least 8 characters long"}), 400

        # user object containing information needed for registration
        user = {
            "_id": uuid.uuid4().hex,
            "email": data["email"],
            "password": data["password"]
        }
        
        # encrypting password
        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        # preventing duplicate users
        if db.users.find_one({"email": user["email"]}):
            return jsonify({"Error": "Email is already in use"}), 400
        
        # inserting into database
        db.users.insert_one(user)

        return jsonify(user), 200