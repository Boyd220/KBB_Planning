<?php
//Databankconnectie met de werknemerstabel
require_once '../config.php'; // Database setting constants [DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD]
class dbTabellen {
    private $db;
    private $err;
    function __construct() {
        $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
        try {
            $this->db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
            $response["status"] = "error";
            $response["message"] = 'Connection failed: ' . $e->getMessage();
            $response["data"] = null;
            //echoResponse(200, $response);
            exit;
        }
    }
    function fetchOneRecord($table, $columns, $where)
    {
        try
        {
            $a=array();
$w="";
        foreach ($where as $key => $value) {
                $w .= " and " .$key. " like :".$key;
                $a[":".$key] = $value;
            }
        $stmt = $this->db->prepare("select ".$columns." from ".$table." where 1=1 ". "LIMIT 1");
        $stmt->execute($a);
        $isDatumExists = $stmt->fetch();
        if(count($isDatumExists)<=0){
                $response["status"] = "warning";
                $response["message"] = "Data niet gevonden.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data gevonden uit databank.";
            }
                $response["data"] = $isDatumExists;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Gefaald: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
        
    }
    function select($table, $columns, $where){
        try{
            $a = array();
            $w = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " like :".$key;
                $a[":".$key] = $value;
            }
            $stmt = $this->db->prepare("select ".$columns." from ".$table. " where 1=1". $w);
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Data niet gevonden.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data gevonden uit databank.";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select gefaald: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }

    function select2($table, $columns, $where, $order){
        try{
            $a = array();
            $w = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " like :".$key;
                $a[":".$key] = $value;
            }
            $stmt = $this->db->prepare("select ".$columns." from ".$table." where 1=1 ". $w." ".$order);
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Data niet gevonden";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data gevonden uit databank";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select gefaald ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
    function insert($table, $columnsArray, $requiredColumnsArray) {
        $this->verifyRequiredParams2($columnsArray, $requiredColumnsArray);
        
        try{
            $a = array();
            $c = "";
            $v = "";
            foreach ($columnsArray as $key => $value) {

                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }
            $c = rtrim($c,', ');
            $v = rtrim($v,', ');
            $stmt =  $this->db->prepare("INSERT INTO $table($c) VALUES($v)");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $lastInsertId = $this->db->lastInsertId();
            $response["status"] = "success";
            $response["message"] = $affected_rows." kolom in databank gezet";
            $response["data"] = $lastInsertId;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Insert gefaald: ' .$e->getMessage();
            $response["data"] = 0;
        }
        return $response;
    }
    function update($table, $columnsArray, $where, $requiredColumnsArray){ 
        $this->verifyRequiredParams2($columnsArray, $requiredColumnsArray);
        try{
            $a = array();
            $w = "";
            $c = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " = :".$key;
                $a[":".$key] = $value;
            }
            foreach ($columnsArray as $key => $value) {
                $c .= $key. " = :".$key.", ";
                $a[":".$key] = $value;
            }
                $c = rtrim($c,", ");

            $stmt =  $this->db->prepare("UPDATE $table SET $c WHERE 1=1 ".$w);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "Rij niet geüpdate";
            }else{
                $response["status"] = "success";
                $response["message"] = $affected_rows." rij(en) geüpdate in database";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update gefaald: " .$e->getMessage();
        }
        return $response;
    }
    function delete($table, $where){
        if(count($where)<=0){
            $response["status"] = "warning";
            $response["message"] = "Delete gefaald: Er is een parameter nodig op zijn minst";
        }else{
            try{
                $a = array();
                $w = "";
                foreach ($where as $key => $value) {
                    $w .= " and " .$key. " = :".$key;
                    $a[":".$key] = $value;
                }
                $stmt =  $this->db->prepare("DELETE FROM $table WHERE 1=1 ".$w);
                $stmt->execute($a);
                $affected_rows = $stmt->rowCount();
                if($affected_rows<=0){
                    $response["status"] = "warning";
                    $response["message"] = "Geen rij verwijderd";
                }else{
                    $response["status"] = "success";
                    $response["message"] = $affected_rows." rijden verwijderd uit database";
                }
            }catch(PDOException $e){
                $response["status"] = "error";
                $response["message"] = 'Delete Failed: ' .$e->getMessage();
            }
        }
        return $response;
    }
    /*function selectP($name){
        // Select statement
        try{
            // $a = array();
            // $w = "";
            // // $where = array('name' => 'Ipsita Sahoo', 'uid'=>'170' );
            // foreach ($where as $key => $value) {
            //     $w .= " and " .$key. " like :".$key;
            //     $a[":".$key] = $value;
            // }
            // $stmt = $this->db->prepare("CALL `simpleproc`(@a);SELECT @a AS `param1`;");
            // $stmt->execute($a);
            // return $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = $this->db->prepare("CALL $name(@resultId)"); 
            $stmt->execute(); 
            $stmt = $this->db->prepare("select @resultId as Id"); 
            $stmt->execute(); 
            $myResultId = $stmt->fetchColumn();

            print "procedure returned \n".$myResultId;
            
        }catch(PDOException $e){
            print_r('Query Failed: ' .$e->getMessage());
            return $rows=null;
            exit;
        }
    }*/

        function verifyRequiredParams2($inArray, $requiredColumns) {
        $error = false;
        $errorColumns = "";
        foreach ($requiredColumns as $field) {
        // strlen($inArray->$field);
            if (!isset($inArray->$field) || strlen(trim($inArray->$field)) <= 0) {
                $error = true;
                $errorColumns .= $field . ', ';
            }
        }

        if ($error) {
            $response = array();
            $response["status"] = "error";
            $response["message"] = 'De benodigde velden ' . rtrim($errorColumns, ', ') . ' zijn niet of niet volledig ingevuld';
            echoResponse(200, $response);
            exit;
        }
    }
}

?>
