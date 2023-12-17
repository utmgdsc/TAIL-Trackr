from flask import Flask, jsonify, request, session
import uuid

class Animal:
    # retrieve all entries in the database
    def getAll(self, db):
        post_list = []
        postings = db.postings.find({})
        for doc in postings:
            post_list.append(doc)
        return post_list
    

    # this function will post the data according to the user's entries in the form
    def postNew(self, db):
        # data = dict(request.json)

        # this line contains the form data
        data = dict(request.json)

        new_post = {
            "_id": uuid.uuid4().hex,
            "uploader": session["user"]["email"],
            "image": data["data"]["image"],
            "latitude": data["data"]["location"]["latitude"],
            "longitude": data["data"]["location"]["longitude"],
            "animalStatus": data["data"]["animalStatus"],
            "userDescription": data["data"]["userDescription"],
            "phoneNumber": data["data"]["phone"]
        }
        print(new_post)
        # if the data already exists, don't want a duplicate
        # if (db.postings.find(data)):
        #     return jsonify({"Error": "posting already exists"}), 409
        
        # else:
        db.postings.insert_one(new_post)

        return jsonify({"Data": data}), 200