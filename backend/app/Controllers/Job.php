<?php

namespace App\Controllers;

use App\Models\ApplicationModel;
use App\Models\CategoryModel;
use App\Models\JobModel;
use App\Models\LocationModel;

class Job extends BaseController
{
    private JobModel $jobModel;
    private CategoryModel $categoryModel;
    private LocationModel $locationModel;
    private ApplicationModel  $applicationModel;

    public function __construct()
    {
        $this->jobModel = new JobModel();
        $this->categoryModel = new CategoryModel();
        $this->locationModel = new LocationModel();
        $this->applicationModel = new ApplicationModel();
    }

    public function createJobPosting()
    {
        $data = $this->request->getJSON(true);

        if (!$this->validateJobPosting($data)) {
            return $this->returnResponse($this->validator->getErrors(), 400);
        }

        $userId = $this->getLoggedInUser();

        if (!$userId) {
            return $this->returnResponse(['message' => 'User not logged in'], 400);
        }

        try {
            $this->db->transStart();

            $categoryId = $this->ensureCategoryExists(trim(strtolower($data['category'])));

            $locationId = $this->ensureLocationExist(trim(strtolower($data['location'])));

            $jobData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'category_id' => $categoryId,
                'location_id' => $locationId,
                'user_id' => $userId,
                'company_name' => $data['company_name'],
                'requirements' => $data['requirements'] ?? null,
            ];



            $this->jobModel->createJob($jobData);

            $this->db->transCommit();

            return $this->returnResponse(['message' => 'Job posting created successfully'], 200);
        } catch (\Exception $e) {
            $this->db->transRollback();
            return $this->returnResponse(['message' => 'Job posting failed'], 400);
        }
    }

    public function getJobs()
    {
        $category = $this->request->getVar('category') ?? null;
        $location = $this->request->getVar('location') ?? null;

        $jobs = $this->jobModel->getJobs($category, $location);

        return $this->returnResponse($jobs, 200);
    }

    public function getJobById($id)
    {

        $userId = $this->session->get('user_id');

        if (!$userId) {
            return $this->returnResponse(['message' => 'User not logged in'], 401);
        }

        $job = $this->jobModel->getJobById($id);

        if (!$job) {
            return $this->returnResponse(['message' => 'Job not found'], 404);
        }

        $job['applied'] = $this->applicationModel->checkIfUserApplied($id, $userId) ? true : false;

        return $this->returnResponse($job, 200);
    }

    public function getJobByUserId()
    {
        $userId = $this->getLoggedInUser();

        if (!$userId) {
            return $this->returnResponse(['message' => 'User not logged in'], 401);
        }

        $jobs = $this->jobModel->getJobByUserId($userId);

        return $this->returnResponse($jobs, 200);
    }

    public function updateJob($id)
    {
        $data = $this->request->getJSON(true);

        $userId = $this->getLoggedInUser();

        if (!$userId) {
            return $this->returnResponse(['message' => 'User not logged in'], 401);
        }

        // $job = $this->jobModel->getJobById($id);

        // if (!$job) {
        //     return $this->returnResponse(['message' => 'Job not found'], 404);
        // }

        // if ($job['user_id'] !== $userId) {
        //     return $this->returnResponse(['message' => 'Unauthorized'], 401);
        // }

        $job = [
            'title' => $data['title'],
            'description' => $data['description'],
            'requirements' => $data['requirements'] ?? null,
            'company_name' => $data['company_name'],
        ];

        $this->jobModel->updateJob($job, $id);

        return $this->returnResponse(['message' => 'Job updated successfully'], 200);
    }

    public function deleteJob($id)
    {
        $userId = $this->getLoggedInUser();

        if (!$userId) {
            return $this->returnResponse(['message' => 'User not logged in'], 401);
        }

        $job = $this->jobModel->getJobById($id);

        if (!$job) {
            return $this->returnResponse(['message' => 'Job not found'], 404);
        }

        if ($job['user_id'] !== $userId) {
            return $this->returnResponse(['message' => 'Unauthorized'], 401);
        }

        $this->jobModel->deleteJob($id);

        return $this->returnResponse(['message' => 'Job deleted successfully'], 200);
    }

    private function ensureCategoryExists($categoryName)
    {
        $alreadyExists = $this->categoryModel->getCategoryByName($categoryName);

        if ($alreadyExists) {
            return $alreadyExists['id'];
        }

        return $this->categoryModel->createCategory(['name' => $categoryName]);
    }

    private function ensureLocationExist($locationName)
    {
        $alreadyExists = $this->locationModel->getLocationByName($locationName);

        if ($alreadyExists) {
            return $alreadyExists['id'];
        }

        return $this->locationModel->createLocation(['name' => $locationName]);
    }

    private function validateJobPosting($data)
    {
        $this->validator = \Config\Services::validation();

        $rules = [
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
            'location' => 'required',
            'company_name' => 'required',
        ];

        $this->validator->setRules($rules);
        return $this->validator->run($data);
    }

    public function getCategories ()
    {
        $categories = $this->categoryModel->getCategories();

        return $this->returnResponse($categories, 200);
    }

    public function getLocations ()
    {
        $locations = $this->locationModel->getLocations();

        return $this->returnResponse($locations, 200);
    }
}
