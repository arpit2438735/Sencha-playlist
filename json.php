
<?php 
//$ch = curl_init();
//curl_setopt($ch, CURLOPT_URL,'http://carouselinfo.com/contents.js');
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//$contents = curl_exec ($ch);
//curl_close($ch);

   
$myFile = "contents.js";
$fh = file($myFile,FILE_SKIP_EMPTY_LINES);
foreach ($fh as $key => $value) {
	if ($value[0]==='{'){
        $val=explode(',',$value);
		$pos1= stripos($val[0], ":");
        $pos2= stripos($val[1], ":");
		$url=substr($val[0],$pos1+2,-1);
        $duration=substr($val[1],$pos2+1,-1);
        $array[]=array("title"=>$url,"duration"=>$duration,"hidden"=>$key);
      }
      
}      
     echo json_encode($array);
  
 
?>
