from flask import Flask, request

app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def upload_image():

    # this line contains the image bytecode, will be sent to google cloud later
    image_data = request.get_data()

    return {"response": "Data Received"}


if __name__ == "__main__":
    app.run(debug=True)