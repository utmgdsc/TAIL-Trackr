from flask import Flask, request, jsonify
from passlib.hash import pbkdf2_sha256
import uuid

class User:
    def register(self, db):
        # the response data
        data = dict(request.json)

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
            return jsonify({"Error": "Email is already in use"})
        
        # inserting into database
        db.users.insert_one(user)

        return jsonify(user), 200