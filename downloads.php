<?php
//header("Access-Control-Allow-Origin: *");
$req = json_decode(file_get_contents("php://input"), true);

if (empty($req) || !isset($req)) return;

$response = ['success' => false, 'msg' => 'PASSWORD INCORRECT <br> PLEASE RE-ENTER'];

$filesData = [
	'LEAKE-ST.pdf' => 'Leake321x',
	'DENMARK-ST.pdf' => 'Denmark321x',
	'HAPPENING.pdf' => 'Bettes321x',
];

$requestedFile = $req['file'];
$submitedPass = $req['password'];

/* var_dump($filesData[$requestedFile]);
var_dump($requestedFile);
var_dump($submitedPass);
die;  */

if (isset($filesData[$requestedFile]) && $filesData[$requestedFile] == $submitedPass)
{
	$directory = 'site/assets/downloads/';
	$file = 'https://' . $_SERVER['SERVER_NAME'] . '/' . $directory . $requestedFile;
	$file = $_SERVER['DOCUMENT_ROOT'] . '/' . $directory . $requestedFile;


	if (file_exists($file)) {
		
		$b64Pdf = chunk_split(base64_encode(file_get_contents($file)));

		$response = ['success' => true, 'msg' => 'DOWNLOADING IN PROGRESS...', 'pdf' => $b64Pdf];			
	}	
}

echo json_encode($response);
exit;

