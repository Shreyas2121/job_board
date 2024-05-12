<?php

namespace App\Models;

use CodeIgniter\Database\BaseBuilder;
use CodeIgniter\Model;

class JobModel extends Model
{
    public BaseBuilder $qb;

    public function __construct()
    {
        parent::__construct();

        $this->qb = $this->db->table('job_listings j');
    }

    public function createJob($data)
    {
        $this->qb->insert($data);
        return $this->db->insertID();
    }

    public function getJobs($category,$location)
    {
        $this->qb->select("j.title as title, u.id as userId, j.id, j.company_name as company, c.name as category, j.created_at as datePosted, l.name as location, c.id as cId, l.id as locId")
                    ->join('categories c', 'c.id = j.category_id')
                    ->join('locations l', 'l.id = j.location_id')
                    ->join('users u', 'u.id = j.user_id');

        if($category){
            $this->qb->where('c.id', $category);
        }

        if($location){
            $this->qb->where('l.id', $location);
        }

        return $this->qb->get()->getResultArray();
    }

    public function getJobById($id)
    {
        $this->qb->select("j.title as title, u.id as userId, j.description, j.requirements, j.id, j.company_name as company, c.name as category, j.created_at as datePosted, l.name as location")
                    ->join('categories c', 'c.id = j.category_id')
                    ->join('locations l', 'l.id = j.location_id')
                    ->join('users u', 'u.id = j.user_id')
                    ->where('j.id', $id);

        return $this->qb->get()->getRowArray();
    }

    public function getJobByUserId($userId)
    {
        $this->qb->select("j.title as title, j.id, j.company_name as company, c.name as category, j.created_at as datePosted, l.name as location, j.description, j.requirements")
                    ->join('categories c', 'c.id = j.category_id')
                    ->join('locations l', 'l.id = j.location_id')
                    ->where('j.user_id', $userId);

        return $this->qb->get()->getResultArray();
    }

    public function updateJob($data, $id)
    {
        $this->qb->where('id', $id)->update($data);
    }

    public function deleteJob($id)
    {
        $this->qb->where('id', $id)->delete();
    }
}
