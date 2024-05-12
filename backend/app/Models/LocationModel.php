<?php

namespace App\Models;

use CodeIgniter\Database\BaseBuilder;
use CodeIgniter\Model;

class LocationModel extends Model
{
    public BaseBuilder $qb;

    public function __construct()
    {
        parent::__construct();

        $this->qb = $this->db->table('locations');
    }

    public function createLocation($data)
    {
        $this->qb->insert($data);
        return $this->db->insertID();
    }

    public function getLocationByName($name)
    {
        $result = $this->qb->getWhere(['name' => $name]);

        if ($result !== false) {
            return $result->getRowArray();
        } else {
            return null;
        }
    }

    public function getLocations()
    {
        return $this->qb->get()->getResultArray();
    }
}
