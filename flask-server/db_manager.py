import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from certifi import where

# ensuring that user making modifications to the database is a valid administrator, and starting the client
def db_manager():
    user = ""
    password = ""
    with open("credentials.json", "r") as json_file:
        data = json.load(json_file)
        user = data["user"]
        password = data["password"]

    uri = f'mongodb+srv://{user}:{password}@login.fwh5tj6.mongodb.net/?retryWrites=true&w=majority'

    # Create a new client and connect to the server
    return MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=where())