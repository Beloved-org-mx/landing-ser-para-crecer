<?php
/**
 * PHPMailer multiple files upload and send
 */

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "./PHPMailer/PHPMailer.php";
require "./PHPMailer/SMTP.php";
require "./PHPMailer/Exception.php";

$config = require "./config.php";

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";

//Server settings
$mail->isSMTP();
$mail->Host = $config["MAIL_HOST"];
$mail->SMTPAuth = true;
$mail->Username = $config["MAIL_USERNAME"];
$mail->Password = $config["MAIL_PASSWORD"];
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = $config["MAIL_PORT"];

if (isset($_POST["nombre"])) {
    // Sanitización de todos los campos
    $nombre = strip_tags(trim($_POST["nombre"]));
    $telefono = strip_tags(trim($_POST["telefono"]));
    $correo = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
    $estado = strip_tags(trim($_POST["estado"]));
    $mensaje = strip_tags(trim($_POST["mensaje"]));

    // Eliminar saltos de línea
    $nombre = str_replace(["\r", "\n"], [" ", " "], $nombre);
    $apellido = str_replace(["\r", "\n"], [" ", " "], $apellido);

    try {
        //Recipients
        $mail->setFrom(
            "contacto@beloved.org.mx",
            "Mensaje desde landing de Beloved"
        );
        $mail->addAddress("contacto@beloved.org.mx");
        $mail->addReplyTo(
            $correo,
            "Hola Beloved, deseo obtener más información."
        );

        //Content
        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de " . $nombre . " " . $apellido;

        // Construir el cuerpo del mensaje
        $mail->Body = "
            <strong>Información del contacto:</strong><br>
            Nombre: {$nombre}<br>
            Teléfono: {$telefono}<br>
            Correo electrónico: {$correo}<br>
            <br>
            <strong>Ubicación:</strong><br>
            Estado: {$estado}<br>
            <br>
            <strong>Mensaje:</strong><br>
            {$mensaje}<br>
            <br>
            Este mensaje fue enviado a través del formulario de contacto de un landing de Beloved.";

        $mail->send();
        echo "✅ Gracias por contactarnos, nos pondremos en contacto contigo a la brevedad.";
    } catch (Exception $e) {
        echo "❌ Lo sentimos, algo salió mal. Por favor, inténtalo de nuevo. Mailer Error: " .
            $mail->ErrorInfo;
    }
} else {
    echo "Por favor, completa todos los campos requeridos.";
}
