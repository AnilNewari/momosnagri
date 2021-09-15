<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// MOBILE
if (empty($_POST["mobile"])) {
    $errorMSG .= "Mobile is required ";
} else {
    $email = $_POST["mobile"];
}

// PLAN
if (empty($_POST["plan"])) {
    $errorMSG .= "Plan is required ";
} else {
    $plan = $_POST["plan"];
}

// ADDRESS
if (empty($_POST["address"])) {
    $errorMSG .= "Address is required ";
} else {
    $address = $_POST["address"];
}

$email = "ak.newari@gmail.com";
$EmailTo = "foodrajcafe@gmail.com";
$Subject = "New Tiffin Enquiry Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Mobile: ";
$Body .= $mobile;
$Body .= "\n";
$Body .= "Plan: ";
$Body .= $plan;
$Body .= "\n";
$Body .= "Address: ";
$Body .= $address;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>