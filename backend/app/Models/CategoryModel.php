<?php

namespace App\Models;

use CodeIgniter\Database\BaseBuilder;
use CodeIgniter\Model;

class CategoryModel extends Model
{
    public BaseBuilder $qb;

    public function __construct()
    {
        parent::__construct();

        $this->qb = $this->db->table('categories');
    }

    public function createCategory($data)
    {
        $this->qb->insert($data);
        return $this->db->insertID();
    }

    public function getCategoryByName(string $name)
    {
        $result = $this->qb->getWhere(['name' => $name]);

        if ($result !== false) {
            return $result->getRowArray();
        } else {
            return null;
        }
    }

    public function getCategories()
    {
        return $this->qb->get()->getResultArray();
    }
}
