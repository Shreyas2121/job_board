<?php

namespace App\Models;

use CodeIgniter\Database\BaseBuilder;
use CodeIgniter\Model;

class ApplicationModel extends Model
{
    public BaseBuilder $qb;

    public function __construct()
    {
        parent::__construct();

        $this->qb = $this->db->table('applications a');
    }

    public function createApplication($jobId,$userId)
    {
        $this->qb->insert([
            'job_listing_id' => $jobId,
            'user_id' => $userId,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        return $this->db->insertID();
    }

    public function getApplications($userId)
    {
        $this->qb->select("j.title as title, j.id, j.company_name as company, a.created_at as dateApplied, c.name as category, l.name as location")
                    ->join('job_listings j', 'j.id = a.job_listing_id')
                    ->join('users u', 'u.id = a.user_id')
                    ->join('categories c', 'c.id = j.category_id')
                    ->join('locations l', 'l.id = j.location_id')
                    ->where('a.user_id', $userId);

        return $this->qb->get()->getResultArray();
    }

    public function checkIfUserApplied($jobId, $userId)
    {
        $this->qb->select('id')
            ->where('job_listing_id', $jobId)
            ->where('user_id', $userId);

        return $this->qb->get()->getRow();
    }
}
