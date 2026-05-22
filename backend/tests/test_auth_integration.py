import os
import sys
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app  # noqa: E402


class AuthIntegrationTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
        self.users = {}

        self.patches = [
            patch('app.routes.auth_routes.UserModel.find_by_username', side_effect=self._find_by_username),
            patch('app.routes.auth_routes.UserModel.create_user', side_effect=self._create_user),
            patch('app.utils.auth_middleware.UserModel.find_by_id', side_effect=self._find_by_id),
        ]

        for patcher in self.patches:
            patcher.start()

    def tearDown(self):
        for patcher in reversed(self.patches):
            patcher.stop()

    def _find_by_username(self, username):
        return self.users.get(username)

    def _create_user(self, payload):
        user = dict(payload)
        user['_id'] = ObjectId()
        self.users[user['username']] = user
        return SimpleNamespace(inserted_id=user['_id'])

    def _find_by_id(self, user_id):
        for user in self.users.values():
            if str(user['_id']) == str(user_id):
                return user
        return None

    def test_register_login_and_access_protected_content(self):
        register_res = self.client.post(
            '/auth/register',
            json={'username': 'bharath_test', 'password': 'secret123'},
        )
        self.assertEqual(register_res.status_code, 201)
        self.assertEqual(register_res.get_json()['message'], 'Account created successfully')

        login_res = self.client.post(
            '/auth/login',
            json={'username': 'bharath_test', 'password': 'secret123'},
        )
        self.assertEqual(login_res.status_code, 200)
        token = login_res.get_json()['token']
        self.assertTrue(token)

        protected_res = self.client.get(
            '/content/get',
            headers={'Authorization': f'Bearer {token}'},
        )
        self.assertEqual(protected_res.status_code, 200)
        data = protected_res.get_json()
        self.assertIn('reading', data)
        self.assertIn('listening', data)


if __name__ == '__main__':
    unittest.main()
