<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-type: application/json');
	
	if (isset($_GET['sigla'])){
		$sigla = $_GET['sigla'];

		$txtEstados = file_get_contents('./estados_cidades.json');
		$estados = json_decode($txtEstados)->estados;

		foreach ($estados as $estado) {
			if ($estado->sigla === $sigla){
				echo json_encode($estado->cidades);
			}
		}
	} else { 
		echo '[]';
    }
    
    //sleep(2);
?>