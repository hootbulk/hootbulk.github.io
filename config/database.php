<?php

$my_env_var = getenv('ENV_VAR');

class Database{

    if($my_env_var != 'production') {
      private $host = "us-cdbr-iron-east-03.cleardb.net";
      private $db_name = "heroku_14623f4742d3625";
      private $username = "b374ad5080867e";
      private $password = "5dca8c25";
    } else {
      private $host = "us-cdbr-iron-east-03.cleardb.net";
      private $db_name = "heroku_f21a9b33cf39ec3";
      private $username = "b34b087174976e";
      private $password = "f2315a94";
    }
    public $conn;

    // get the database connection
    public function getConnection(){

        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
