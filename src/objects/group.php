<?php
class Group{

    private $conn;
    private $table_name = "groups";

    public $user_id;
    public $group_name;
    public $group_description;
    public $group_type;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            $query = "INSERT INTO groups
                SET user_id=:user_id, group_name=:group_name, group_description=:group_description, group_type=:group_type";
            $stmt = $this->conn->prepare($query);

            $group_name=htmlspecialchars(strip_tags($this->group_name));
            $group_description=htmlspecialchars(strip_tags($this->group_description));

            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':group_name', $group_name);
            $stmt->bindParam(':group_description', $group_description);
            $stmt->bindParam(':group_type', $group_type);


            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function readAll(){

        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

  public function update(){

    $query = "UPDATE users
                SET f_name=:f_name, l_name=:l_name, dob=:dob, email=:email, password=:password, membership_id=:membership_id
                WHERE id=:id";

    $stmt = $this->conn->prepare($query);

    $f_name=htmlspecialchars(strip_tags($this->f_name));
    $l_name=htmlspecialchars(strip_tags($this->l_name));
    $dob=htmlspecialchars(strip_tags($this->dob));
    $email=htmlspecialchars(strip_tags($this->email));
    $password=htmlspecialchars(strip_tags($this->password));
    $membership_id=htmlspecialchars(strip_tags($this->membership_id));
    $id=htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':f_name', $f_name);
    $stmt->bindParam(':l_name', $l_name);
    $stmt->bindParam(':dob', $dob);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':membership_id', $membership_id);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
  }

  public function delete($ins){

    // query to delete multiple records
    $query = "DELETE FROM users WHERE id IN (:ins)";

    $stmt = $this->conn->prepare($query);

    // sanitize
    $ins=htmlspecialchars(strip_tags($ins));

    // bind the parameter
    $stmt->bindParam(':ins', $ins);

    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
  }
}
