<?php
include('Mail.php');


$recipients = 'renhuailin@keepfinding.com'; //CHANGE
$headers['From']= 'sarahma@marjakurki.com.cn'; //CHANGE
$headers['To']= 'renhuailin@keepfinding.com'; //CHANGE
$headers['Subject'] = 'Test message';
$body = 'Test message'; // Define SMTP Parameters
$params['host'] = 'smtp.marjakurki.com.cn';
// $params['host'] = 'smtp.exmail.qq.com';
$params['port'] = '25';
$params['auth'] = 'PLAIN';
$params['username'] = 'sarahma'; //CHANGE
$params['password'] = 'mk59070530'; //CHANGE
// $params['username'] = 'renhuailin@keepfinding.com'; //CHANGE
// $params['password'] = 'Renhl01'; //CHANGE

/* The following option enables SMTP debugging and will print the SMTP conversation to the page, it will only help with authentication issues, if PEAR::Mail is not installed you won't get this far. */

$params['debug'] = 'true'; // Create the mail object using the Mail::factory method
$mail_object =& Mail::factory('smtp', $params); // Print the parameters you are using to the page

foreach ($params as $p){
 echo "$p<br />";
}

// Send the message
$mail_object->send($recipients, $headers, $body);

?>
