from flask import Flask, jsonify

class Animal:
    def getAll(self, db):
        postings = db.postings.find({})
        for doc in postings:
            print(doc)
        return jsonify({"Hi": "trueeeee"})