<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST['subject']));
    $message = strip_tags(trim($_POST['message']));

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "INVALID DATA PACKET"]);
        exit;
    }

    $recipient = "vijales2000@gmail.com";
    $email_content = "Nome: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Assunto: $subject\n\n";
    $email_content .= "Mensagem:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($recipient, "VIJALES CONTACT: $subject", $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "SIGNAL RECEIVED"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "TRANSMISSION FAILED"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "UNAUTHORIZED ACCESS"]);
}
?>
