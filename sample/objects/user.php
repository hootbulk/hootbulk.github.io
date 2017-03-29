<?php
class User{

    private $conn;
    private $table_name = "users";

    public $id;
    public $f_name;
    public $l_name;
    public $dob;
    public $email;
    public $password;
    public $membership_id;
    public $timestamp;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            $query = "INSERT INTO users
                SET f_name=:f_name, l_name=:l_name, dob=:dob, email=:email, password=:password, membership_id=:membership_id, created=:created";
            $stmt = $this->conn->prepare($query);

            $f_name=htmlspecialchars(strip_tags($this->f_name));
            $l_name=htmlspecialchars(strip_tags($this->l_name));
            $dob=htmlspecialchars(strip_tags($this->dob));
            $email=htmlspecialchars(strip_tags($this->email));
            $password=htmlspecialchars(strip_tags($this->password));
            $membership_id=htmlspecialchars(strip_tags($this->membership_id));

            $stmt->bindParam(':f_name', $f_name);
            $stmt->bindParam(':l_name', $l_name);
            $stmt->bindParam(':dob', $dob);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':membership_id', $membership_id);

            $created=date('Y-m-d H:i:s');
            $stmt->bindParam(':created', $created);

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

        $query = "SELECT u.id, u.f_name, u.l_name, u.dob, u.email, u.password, m.name as membership_name
                    FROM " . $this->table_name . " u
                        LEFT JOIN memberships m
                            ON u.membership_id=m.id
                    ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function readOne(){

      $query = "SELECT u.id, u.f_name, u.l_name, u.dob, u.email, u.password, m.name as membership_name
                  FROM " . $this->table_name . " u LEFT JOIN memberships m ON u.membership_id=m.id
                  WHERE u.id=:id";

      $stmt = $this->conn->prepare($query);

      $id=htmlspecialchars(strip_tags($this->id));
      $stmt->bindParam(':id', $id);
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
