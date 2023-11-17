from flask import Flask, request, jsonify, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid

class User:
    def start_session(self, user):
        del user["password"]
        session["logged_in"] = True
        session["user"] = user
        return jsonify(user), 200

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
            return jsonify({"Error": "Email is already in use"}), 401
        
        # inserting into database
        if db.users.insert_one(user):
            return self.start_session(user)
        
        return jsonify({"error": "Failed signup"}), 400

    def logout(self):
        session.clear()
        print(session)
        return redirect("/")
        
    
    def login(self, db):
        data = dict(request.json)

        # user object containing information needed
        user = db.users.find_one({
            "email": data["email"]
        })

        if user and pbkdf2_sha256.verify(data["password"], user["password"]):
            return self.start_session(user)
        
        return jsonify({"error": "Invalid login credentials"}), 400