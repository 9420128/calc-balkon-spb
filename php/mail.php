<?php

$_POST = json_decode(file_get_contents('php://input'), true);

if ($_POST) {

    $project_name = trim($_POST["project_name"]);
    $email_admin = trim($_POST["email_admin"]);
    $email_to = trim($_POST["email_to"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

} 

function adopt($text)
{
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $email_admin . '>' . PHP_EOL .
    'Reply-To: ' . $email_admin . '' . PHP_EOL;

mail($email_to, adopt($subject), $message, $headers);

?>
