<?php
	$fData = $_POST["cssdata"];
    function filenameFinder(){
		$fName = rand(1000000000,9999999999);
		$fileName = "./tmp/".$fName.".css";
		if ($handle = opendir('./tmp/')) {
	    	while (false !== ($entry = readdir($handle))) {
		        if ($entry != "." && $entry != "..") {
		            if("./tmp/".$entry == $fileName){
		            	filenameFinder();
		            }
		        }
	    	}
	    	closedir($handle);
		}
		return $fileName;
	}

	
	$myFile = filenameFinder();

	$fh = fopen($myFile, 'w');
	fwrite($fh, $fData);
	echo $myFile;

?>