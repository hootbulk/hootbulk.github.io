<?php
class Database{

    // specify your own database credentials
    private $host = "us-cdbr-iron-east-03.cleardb.net";
    private $db_name = "heroku_14623f4742d3625";
    private $username = "b374ad5080867e";
    private $password = "5dca8c25";
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
