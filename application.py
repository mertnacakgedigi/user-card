from flask import Flask, jsonify ,request ,render_template

application = Flask(__name__)

@application.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":

    application.debug = True
    application.run()