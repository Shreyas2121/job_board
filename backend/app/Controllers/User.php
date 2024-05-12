<?php

namespace App\Controllers;

use App\Models\UserModel;

class User extends BaseController
{
    private UserModel $userModel;
    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function register()
    {
        $data = $this->request->getJSON(true);

        if (!$this->validateRegister($data)) {
            return $this->returnResponse($this->validator->getErrors(), 400);
        }

        try {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

            $this->userModel->createUser($data);
        } catch (\Exception $e) {
            return $this->returnResponse(['message' => 'User registration failed'], 400);
        }

        return $this->returnResponse(['message' => 'User registered successfully'], 200);
    }

    public function login()
    {
        $data = $this->request->getJSON(true);

        if (!$this->validateLogin($data)) {
            return $this->returnResponse($this->validator->getErrors(), 400);
        }

        $user = $this->userModel->getUserByEmail($data['email']);

        if (!$user) {
            return $this->returnResponse(['message' => 'User not found'], 404);
        }

        if ($this->session->get('user_id') === $user['id']) {
            return $this->returnResponse(['message' => 'User already logged in'], 400);
        }

        if (!password_verify($data['password'], $user['password'])) {
            return $this->returnResponse(['message' => 'Invalid password'], 400);
        }

        $this->session->set('user_id', $user['id']);

        return $this->returnResponse(['message' => 'Login successful', 'user' => $user], 200);
    }

    public function checkSessionStatus()
    {
        if ($this->session->get('user_id')) {
            return $this->returnResponse(['valid' => true], 200);
        } else {
            return $this->returnResponse(
                [
                    'message' => '
                Session not found. Please login to continue.
            ',
                    'valid' => false,
                ],
                200,
            );
        }
    }

    public function getUser($id)
    {
        try {
            $user = $this->userModel->getUserById($id);
            if (!$user) {
                return $this->returnResponse(['message' => 'User not found'], 404);
            }
            return $this->returnResponse($user, 200);
        } catch (\Exception $e) {
            return $this->returnResponse(['message' => 'Failed to fetch user'], 400);
        }
    }

    public function logout()
    {
        $this->session->destroy();
        return $this->returnResponse(['message' => 'Logged out successfully'], 200);
    }

    private function validateRegister($data)
    {
        $this->validator = \Config\Services::validation();

        $rules = [
            'username' => 'required|is_unique[users.username]',
            'email' => 'required|valid_email|is_unique[users.email]',
            'password' => 'required',
        ];

        $messages = [
            'username' => [
                'is_unique' => 'The username is already taken. Please choose a different username.',
            ],
            'email' => [
                'is_unique' => 'The email is already registered. Please use a different email address.',
            ],
        ];

        $this->validator->setRules($rules, $messages);
        return $this->validator->run($data);
    }

    private function validateLogin($data)
    {
        $this->validator = \Config\Services::validation();

        $rules = [
            'email' => 'required|valid_email',
            'password' => 'required',
        ];

        $this->validator->setRules($rules);
        return $this->validator->run($data);
    }
}
