<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


// API

$routes->group('api', function($routes){
    $routes->group('v1', function($routes){
        $routes->group('users', function($routes){
            $routes->post('register', 'User::register');
            $routes->post('login', 'User::login');
            $routes->get('(:num)', 'User::getUser/$1');
            $routes->get('logout', 'User::logout');
            $routes->get('check', 'User::checkSessionStatus');
        });

        $routes->group('jobs', function($routes){
            $routes->post('create', 'Job::createJobPosting');
            $routes->get('(:num)', 'Job::getJobById/$1');
            $routes->get('/','Job::getJobs');
            $routes->get('categories', 'Job::getCategories');
            $routes->get('locations', 'Job::getLocations');
            $routes->get('user', 'Job::getJobByUserId');
            $routes->put('(:num)', 'Job::updateJob/$1');
            $routes->delete('(:num)', 'Job::deleteJob/$1');
        });

        $routes->group('applications', function($routes){
            $routes->post('create', 'Application::createApplication');
            $routes->get('/', 'Application::getApplications');
        });
    });
});
