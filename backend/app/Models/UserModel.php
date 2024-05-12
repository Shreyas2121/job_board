<?php

namespace App\Models;

use CodeIgniter\Database\BaseBuilder;
use CodeIgniter\Model;

class UserModel extends Model
{
    public BaseBuilder $qb;

    public function __construct()
{
    parent::__construct();

    $this->qb = $this->db->table('users');
}

    public function createUser($data){
        $this->qb->insert($data);
        return $this->db->insertID();
    }

    public function getUserById($id){
        return $this->qb->getWhere(['id' => $id])->getRowArray();
    }

    public function getUserByEmail($email){
        return $this->qb->getWhere(['email' => $email])->getRowArray();
    }

    public function updateUser($id, $data){
        $this->qb->where('id', $id);
        $this->qb->update($data);
    }

    public function deleteUser($id){
        $this->qb->where('id', $id);
        $this->qb->delete();
    }

}


