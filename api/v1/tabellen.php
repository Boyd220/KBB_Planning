<?php

//Werknemers tabel
$db = new dbTabellen();
$app->get('/werknemers', function() {
   global $db;
    $rows = $db->select("werknemers", "id,werknemersnummer,achternaam,voornaam,tel,comments",array());
    echoResponse2(200, $rows);
});

$app->post('/werknemers', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('achternaam');
    global $db;
    $rows = $db->insert("werknemers", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Werknemer added successfully.";
    echoResponse2(200, $rows);
});

$app->put('/werknemers/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("werknemers", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Werknemer updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/werknemers/:id', function($id) { 
    global $db;
    $rows = $db->delete("werknemers", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Werknemer removed successfully.";
    echoResponse(200, $rows);
});

//User authentication tabel
$app->get('/session', function() {
    $db = new DbUserAuth();
    $session = $db->getSession();
    $response["id"] = $session['id'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbUserAuth();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select id,name,password,email,created from auth where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Succesvol ingelogd';
        $response['name'] = $user['name'];
        $response['id'] = $user['id'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['id'] = $user['id'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Inloggen niet gelukt. Verkeerde gegevens.';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'Deze gebruiker bestaat niet.';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbUserAuth();
    $name = $r->customer->name;
    $email = $r->customer->email;
    $password = $r->customer->password;
    $isUserExists = $db->getOneRecord("select 1 from auth where email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "auth";
        $column_names = array('name', 'email', 'password');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Uw account is succesvol aangemaakt";
            $response["id"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $response["id"];
            $_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Probeer nog een keer u in te schrijven";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "Deze e-mail staat al in ons systeem!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbUserAuth();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Succesvol uitgelogd";
    echoResponse(200, $response);
});


?>