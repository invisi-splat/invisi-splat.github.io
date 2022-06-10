<?php
/*
$_POST["function"] = "add";
$_POST["username"] = "poohead";
$_POST["comment"] = "poohead";
$_POST["level"] = 2;
$_POST["id"] = 6;
*/
#$_POST["comment"] = 1;

if ($_POST["function"] === "retrieve") {
  $messages_data = file_get_contents("./uc_data/comments.json");
  $messages = json_decode($messages_data, $assoc=true);
  $comments = $messages["comments"];
  
  for ($i = 0; $i < count($comments); $i++) {
    $comments[$i]["timestamp"] = date("d/m/Y\, \a\\t H:i:s", $comments[$i]["timestamp"]);
  };
  
  $messages["comments"] = $comments;
  
  echo json_encode($messages);
} elseif ($_POST["function"] === "add") {
  $username = htmlspecialchars($_POST["username"]);
  $comment = htmlspecialchars($_POST["comment"]);
  $level = intval($_POST["level"], 10);
  if (isset($_POST["id"])) {
    $r_id = intval($_POST["id"], 10);
  } else {
    $r_id = -1;
  };

  $errors = array();

  array_push($errors, $username, $comment);

  $messages_data = file_get_contents("./uc_data/comments.json");
  $messages = json_decode($messages_data, $assoc=true);
  $comments = $messages["comments"];

  array_push($comments);

  $highest_id = 0;
  $hmm = array();
  for ($i = 0; $i < count($comments); $i++) {
    if ($comments[$i]["id"] > $highest_id) {
      $highest_id = $comments[$i]["id"];
    };
    if ($comments[$i]["comment"] === "") {
      //
    } else {
      array_push($hmm, $comments[$i]);
    };
  };
  $comments = $hmm;
  $id = $highest_id + 1;
  array_push($errors, $id);

  $entry = array("id" => $id, "timestamp" => time(), "username" => $username, "comment" => $comment, "likes" => 0, "level" => $level);
  

  if ($r_id === -1) {
    array_unshift($comments, $entry);
  } else {
    for ($i = 0; $i < count($comments); $i++) {
      if ($comments[$i]["id"] === $r_id) {
        $r_id = $i;
        break;
      };
    };
    /*if ($r_id === 0) {
      $r_id = 1;
    }*/
    array_splice($comments, $r_id + 1, 0, array($entry));
  }


  $messages["comments"] = $comments;
  $json_file = fopen("./uc_data/comments.json", "w");
  fwrite($json_file, json_encode($messages));
  fclose($json_file);

  $entry["timestamp"] = date("d/m/Y\, \a\\t H:i:s", $entry["timestamp"]);
  echo json_encode($entry);
} elseif ($_POST["function"] === "like") {
  $messages_data = file_get_contents("./uc_data/comments.json");
  $messages = json_decode($messages_data, $assoc=true);
  $comments = $messages["comments"];
  $id = intval($_POST["comment"], 10);
  $likes = 0;
  
  for ($i = 0; $i < count($comments); $i++) {
    if ($comments[$i]["id"] === $id) {
      $comments[$i]["likes"] += 1;
      $likes = $comments[$i]["likes"];
    };
  };
  
  $messages["comments"] = $comments;
  $json_file = fopen("./uc_data/comments.json", "w");
  fwrite($json_file, json_encode($messages));
  fclose($json_file);
  
  echo json_encode($likes);
} elseif ($_POST["function"] === "check") {
  if ($_POST["passphrase"] === "plzdontnerfinkling 0561R") {
    echo json_encode("success");
  } else {
    echo json_encode("failure");
  }
};
?>
