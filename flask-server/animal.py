from flask import Flask, jsonify, request

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

        # this line contains the image bytecode, will be sent to google cloud later
        image_data = request.get_data()
        
        # risky line
        # db.insert_one(image_data)

        return jsonify({"Data": image_data}), 200