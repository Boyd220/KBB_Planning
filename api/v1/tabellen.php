<?php
$db = new dbTabellen();

$app->group('/dagplanningen', function () use ($app) {
$app->get('/datum/:datum', function($datum) {
   global $db;
   $condition = array('datum'=>$datum);
    $rows = $db->select("dagplanningen", "id,datum, normOogst, plantenOogst, mensOogst, normResultaatOogst, verwachtUrenOogst, resultaatUrenOogst normDieven, plantenDieven, mensDieven, normResultaatDieven, verwachtUrenDieven, resultaatUrenDieven, normBladknippen, plantenBladknippen, mensBlad, normResultaatBlad, verwachtUrenBlad, resultaatUrenBlad, normSnoeien, plantenSnoeien, mensSnoei, normResultaatSnoeien, verwachtUrenSnoeien, resultaatUrenSnoeien, normZakken, plantenZakken, mensZakken, normResultaatZakken, verwachtUrenZakken, resultaatUrenZakken, normVerpakking, plantenVerpakking, mensVerpakking, normResultaatVerpakking, verwachtUrenVerpakking,verwachtPalletsVerpakking, resultaatPalletsVerpakking, resultaatUrenVerpakking, tuinOogst, tuinDieven, tuinBlad, tuinSnoeien, tuinZakken ", $condition, array());
    echoResponse2(200, $rows);
});

$app->get('/tuin/:tuin', function($tuin) {
   global $db;
   $condition = array('tuin'=>$tuin);
    $rows = $db->select("dagplanningen", "id,datum, normOogst, plantenOogst, mensOogst, normResultaatOogst, verwachtUrenOogst, resultaatUrenOogst normDieven, plantenDieven, mensDieven, normResultaatDieven, verwachtUrenDieven, resultaatUrenDieven, normBladknippen, plantenBladknippen, mensBlad, normResultaatBlad, verwachtUrenBlad, resultaatUrenBlad, normSnoeien, plantenSnoeien, mensSnoei, normResultaatSnoeien, verwachtUrenSnoeien, resultaatUrenSnoeien, normZakken, plantenZakken, mensZakken, normResultaatZakken, verwachtUrenZakken, resultaatUrenZakken, normVerpakking, plantenVerpakking, mensVerpakking, normResultaatVerpakking, verwachtUrenVerpakking,verwachtPalletsVerpakking, resultaatPalletsVerpakking, resultaatUrenVerpakking, tuinOogst, tuinDieven, tuinBlad, tuinSnoeien, tuinZakken ", $condition, array());
    echoResponse2(200, $rows);
});

$app->post('/', function() use ($app) { 
    global $db;
    $data = json_decode($app->request->getBody());
    $mandatory = array('datum');
    $rows = $db->insert("dagplanningen", $data, $mandatory);
    $rows["message"] = serialize($paramValue);
});

$app->put('/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("dagplanningen", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Dagplanning succesvol geüpdate";
    echoResponse(200, $rows);
});

$app->delete('/:id', function($id) { 
    global $db;
    $rows = $db->delete("dagplanningen", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Dagplanning successvol verwijderd";
    echoResponse(200, $rows);
});
});


$app->group('/weekplanningen', function () use ($app) {

$app->get('/week/:weeknr', function($weeknr) {
   global $db;
   $condition = array('weeknr'=>$weeknr);
    $rows = $db->select("weekplanningen", "id,weeknr,date, normVerwachtOogst, plantenOogst, mensOogstBeschikbaar, mensOogstNodig, normVerwachtDieven, plantenDieven, mensDievenBeschikbaar, mensDievenNodig, normVerwachtBlad, plantenBladknippen, mensBladBeschikbaar, mensBladNodig, normVerwachtSnoei, plantenSnoeien, mensSnoeiBeschikbaar, mensSnoeiNodig, normVerwachtZakken, plantenZakken, mensZakkenBeschikbaar, mensZakkenNodig, normVerwachtVerpakking, plantenVerpakking, mensVerpakkingBeschikbaar, mensVerpakkingNodig, tuin", $condition, array());

    echoResponse2(200, $rows);
});

$app->get('/tuin/:tuin', function($tuin) {
   global $db;
   $condition = array('tuin'=>$tuin);

            $rows = $db->select("weekplanningen", "id,weeknr,date, normVerwachtOogst, plantenOogst, mensOogstBeschikbaar, mensOogstNodig, normVerwachtDieven, plantenDieven, mensDievenBeschikbaar, mensDievenNodig, normVerwachtBlad, plantenBladknippen, mensBladBeschikbaar, mensBladNodig, normVerwachtSnoei, plantenSnoeien, mensSnoeiBeschikbaar, mensSnoeiNodig, normVerwachtZakken, plantenZakken, mensZakkenBeschikbaar, mensZakkenNodig, normVerwachtVerpakking, plantenVerpakking, mensVerpakkingBeschikbaar, mensVerpakkingNodig, tuin", $condition, array());
           if($rows["status"] =="success")
           {
                $rows["message"] =="Data gevonden uit databank.";
           }
    
    echoResponse2(200, $rows);
});


$app->post('/', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('weeknr','tuin', 'plantenOogst', 'plantenDieven', 'plantenBladknippen', 'plantenZakken', 'plantenSnoeien', 'plantenVerpakking', 'normVerwachtOogst', 'normVerwachtDieven', 'normVerwachtBlad', 'normVerwachtSnoei', 'normVerwachtZakken', 'normVerwachtVerpakking');
    global $db;
    $rows = $db->insert("weekplanningen", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Weekplanning added successfully.";
    echoResponse2(200, $rows);
});

$app->put('/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("weekplanningen", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Weekplanning updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/:id', function($id) { 
    global $db;
    $rows = $db->delete("weekplanningen", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Weekplanning removed successfully.";
    echoResponse(200, $rows);
});
});

$app->group('/jaarplanningen', function () use ($app) {

$app->get('/:jaar', function($jaar) {
   global $db;
       $condition = array('jaar'=>$jaar);
    $rows = $db->select("jaarplanningen", "id,jaar, plantenOogst, mensOogstNodig, normResultaatOogst, verwachtUrenOogst, resultaatUrenOogst, plantenDieven, mensDievenNodig, normResultaatDieven, verwachtUrenDieven, resultaatUrenDieven, plantenBladknippen, mensBladNodig, normResultaatBlad, verwachtUrenBlad, resultaatUrenBlad, plantenSnoeien, mensSnoeiNodig, normResultaatSnoeien, verwachtUrenSnoeien, resultaatUrenSnoeien,  plantenZakken, mensZakkenNodig, normResultaatZakken, verwachtUrenZakken, resultaatUrenZakken, plantenVerpakking, mensVerpakkingNodig, normResultaatVerpakking, verwachtUrenVerpakking, resultaatPalletsVerpakking, resultaatUrenVerpakking, weeknr, mensOogstBeschikbaar, mensDievenBeschikbaar, mensBladBeschikbaar, mensSnoeiBeschikbaar, mensZakkenBeschikbaar, mensVerpakkingBeschikbaar, normVerwachtOogst, normVerwachtDieven, normVerwachtSnoei, normVerwachtSnoei, normVerwachtZakken, normVerwachtVerpakking", $condition, array());
    echoResponse2(200, $rows);
});

$app->post('/', function() use ($app) {

    $data = json_decode($app->request->getBody());
    $mandatory = array('jaar', 'weeknr');
    global $db;
        $rows = $db->insert("jaarplanningen", $data, $mandatory);
    
    if($rows["status"]=="success")
        $rows["message"] = "Jaarplanning added successfully.";
    echoResponse2(200, $rows);
    

});

$app->put('/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("jaarplanningen", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Jaarplanning updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/:id', function($id) { 
    global $db;
    $rows = $db->delete("jaarplanningen", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Jaarplanning removed successfully.";
    echoResponse(200, $rows);
});
});


//Werknemerstabel
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
    $response["u_role"] = $session['u_role'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->werknemer);
    $response = array();
    $db = new DbUserAuth();
    $password = $r->werknemer->password;
    $email = $r->werknemer->email;
    $user = $db->getOneRecord("select id,name,password,email, u_role from auth where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Succesvol ingelogd';
        $response['name'] = $user['name'];
        $response['id'] = $user['id'];
        $response['email'] = $user['email'];
        $response['u_role'] = $user['u_role'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['id'] = $user['id'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        $_SESSION['u_role'] = $user['u_role'];
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
    verifyRequiredParams(array('email', 'name', 'password', 'u_role'),$r->werknemer);
    require_once 'passwordHash.php';
    $db = new DbUserAuth();
    $name = $r->werknemer->name;
    $email = $r->werknemer->email;
    $password = $r->werknemer->password;
    $u_role = $r->werknemer->u_role;
    $isUserExists = $db->getOneRecord("select 1 from auth where email='$email'");
    if(!$isUserExists){
        $r->werknemer->password = passwordHash::hash($password);
        $tabble_name = "auth";
        $column_names = array('name', 'email', 'password', 'u_role');
        $result = $db->insertIntoTable($r->werknemer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Uw account is succesvol aangemaakt";
            $response["id"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $response["id"];
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['u_role'] = $u_role;
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