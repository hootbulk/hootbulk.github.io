<?php
class Membership{

    private $conn;
    private $table_name = "memberships";

    public $id;
    public $name;

    public function __construct($db){
        $this->conn = $db;
    }

    public function readAll(){

        $query = "SELECT id, name FROM memberships ORDER BY name";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $memberships=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($memberships);
    }

}
?>
