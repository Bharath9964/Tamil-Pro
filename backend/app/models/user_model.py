import app as app_module


class UserModel:
    @staticmethod
    def collection():
        if app_module.db is None:
            raise RuntimeError('Database not initialized. Call create_app() first.')
        return app_module.db.users

    @staticmethod
    def find_by_username(username: str):
        return UserModel.collection().find_one({'username': username})

    @staticmethod
    def find_by_id(user_id):
        return UserModel.collection().find_one({'_id': user_id})

    @staticmethod
    def create_user(payload: dict):
        return UserModel.collection().insert_one(payload)

    @staticmethod
    def update_progress(user_id, progress: dict, level: str):
        return UserModel.collection().update_one(
            {'_id': user_id},
            {'$set': {'progress': progress, 'level': level}}
        )

    @staticmethod
    def update_user(user_id, payload: dict):
        return UserModel.collection().update_one(
            {'_id': user_id},
            {'$set': payload}
        )

    @staticmethod
    def update_display_name(user_id, display_name: str):
        return UserModel.collection().update_one(
            {'_id': user_id},
            {'$set': {'display_name': display_name}}
        )
