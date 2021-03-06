<?php

include 'Mail.php';

$data['result'] = true;

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// error_log("POST: " . var_dump($_POST));

//usage,category,quantity,budget,mobile
if (empty($_POST['usage']) || empty($_POST['category']) || empty($_POST['quantity']) || empty($_POST['budget'])  || empty($_POST['mobile'])) {
    $data['result'] = false;
} else {
    // mk59070530
    // sarahma@marjakurki.com.cn

    $message = '礼品用途：'.$_POST['usage'] . '礼品品类: ' . $_POST['category'] . '  定制数量: ' . $_POST['quantity'] . '  单位预算: ' . $_POST['budget'] . '  客户手机号: ' . $_POST['mobile'] ;

    $headers['Subject'] = '礼品订制需求';
    $body = $message; // Define SMTP Parameters

    $recipients = 'marjakurki@keepfinding.com'; //CHANGE
    $headers['To']= 'marjakurki@keepfinding.com'; //CHANGE
    // $recipients = 'sarahma@marjakurki.com.cn'; //CHANGE
    // $headers['To']= 'sarahma@marjakurki.com.cn'; //CHANGE
    // $recipients = 'renhuailin@keepfinding.com'; //CHANGE
    // $headers['To']= 'renhuailin@keepfinding.com'; //CHANGE

    $headers['From']= 'marjakurki@keepfinding.com'; //CHANGE
    // $headers['From']= 'sarahma@marjakurki.com.cn'; //CHANGE


    $params['host'] = 'smtp.exmail.qq.com';
    // $params['host'] = 'smtp.exmail.qq.com';
    $params['port'] = '25';
    $params['auth'] = 'PLAIN';
    $params['username'] = 'marjakurki@keepfinding.com'; //CHANGE
    $params['password'] = 'Marja001';
    // $params['username'] = 'renhuailin@keepfinding.com'; //CHANGE
    // $params['password'] = 'Renhl01'; //CHANGE

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
