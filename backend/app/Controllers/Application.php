<?php

namespace App\Controllers;

use App\Models\ApplicationModel;

class Application extends BaseController
{
    public ApplicationModel $applicationModel;
    public function __construct()
    {
        $this->applicationModel = new ApplicationModel();
    }

    public function createApplication()
    {
        try {
            $data = $this->request->getJSON(true);

            $userId = $this->session->get('user_id');

            if (!$userId) {
                return $this->returnResponse(
                    [
                        'message' => 'User not logged in',
                    ],
                    401,
                );
            }

            $applicationId = $this->applicationModel->createApplication($data['jobId'],$userId);
            return $this->returnResponse([
                'message' => 'Application created successfully',
            ]);
        } catch (\Exception $e) {
            return $this->returnResponse(
                [
                    'message' => 'Failed to create application',
                ],
                400,
            );
        }
    }

    public function getApplications()
    {
        try {
            $userId = $this->session->get('user_id');

            if (!$userId) {
                return $this->returnResponse(
                    [
                        'message' => 'User not logged in',
                    ],
                    401,
                );
            }

            $applications = $this->applicationModel->getApplications($userId);
            return $this->returnResponse($applications);
        } catch (\Exception $e) {
            return $this->returnResponse(
                [
                    'message' => 'Failed to get applications',
                ],
                400,
            );
        }
    }
}
