<?php

include 'Mail.php';

$data['result'] = true;

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// error_log("POST: " . var_dump($_POST));

//gift_name,gift_category,username,company,mobile
if (empty($_POST['gift_name']) || empty($_POST['gift_category']) || empty($_POST['username']) || empty($_POST['company'])  || empty($_POST['mobile'])) {
    $data['result'] = false;
} else {
    // mk59070530
    // sarahma@marjakurki.com.cn

    $message = '礼品名称：'.$_POST['gift_name'] . '   礼品品类: ' . $_POST['gift_category'] . '  客户名称: ' . $_POST['username'] . '  公司: ' . $_POST['company'] . '  客户手机号: ' . $_POST['mobile'] ;

    $headers['Subject'] = $_POST['gift_category'] . '需求:' . $_POST['gift_name'];
    $body = $message; // Define SMTP Parameters

    $recipients = 'marjakurki@keepfinding.com'; //CHANGE
    $headers['To']= 'marjakurki@keepfinding.com'; //CHANGE
    // $recipients = 'sarahma@marjakurki.com.cn'; //CHANGE
    // $headers['To']= 'sarahma@marjakurki.com.cn'; //CHANGE
    // $recipients = 'renhuailin@keepfinding.com'; //CHANGE
    // $headers['To']= 'renhuailin@keepfinding.com'; //CHANGE

    $headers['From']= 'marjakurki@keepfinding.com'; //CHANGE
    // $headers['From']= 'sarahma@marjakurki.com.cn'; //CHANGE
    //
    $params['host'] = 'smtp.exmail.qq.com';
    // $params['host'] = 'smtp.exmail.qq.com';
    $params['port'] = '25';
    $params['auth'] = 'PLAIN';
    $params['username'] = 'marjakurki@keepfinding.com'; //CHANGE
    $params['password'] = 'Marja001';




    /* The following option enables SMTP debugging and will print the SMTP conversation to the page, it will only help with authentication issues, if PEAR::Mail is not installed you won't get this far. */

    // $params['debug'] = 'true'; // Create the mail object using the Mail::factory method
    $mail_object =& Mail::factory('smtp', $params); // Print the parameters you are using to the page

    // foreach ($params as $p){
    //  echo "$p<br />";
    // }

    // Send the message
    $mail_object->send($recipients, $headers, $body);
}

header('Content-Type: application/json');
echo json_encode($data);
