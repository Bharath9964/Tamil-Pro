from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from app.config import Config

mongo_client = None
db = None


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    global mongo_client, db
    mongo_client = MongoClient(app.config['MONGO_URI'])
    db = mongo_client[app.config['DB_NAME']]

    from app.routes.auth_routes import auth_bp
    from app.routes.test_routes import test_bp
    from app.routes.progress_routes import progress_bp
    from app.routes.content_routes import content_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(test_bp, url_prefix='/test')
    app.register_blueprint(progress_bp, url_prefix='/progress')
    app.register_blueprint(content_bp, url_prefix='/content')

    @app.get('/health')
    def health():
        return {'status': 'ok'}

    return app
