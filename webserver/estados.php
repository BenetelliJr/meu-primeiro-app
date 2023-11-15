<?php
	header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    
    $txtEstados = file_get_contents('./estados.json');
    $estados = json_decode($txtEstados)->estados;

    echo json_encode($estados);

    //sleep(2);
?>