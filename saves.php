<?php

/**
 * @author Arpit Srivastava
 * @contact arpit243835@gmail.com
 * @copyright 2012
 */

if(isset($_POST['hidden'])){
if($_POST['hidden']==NULL)
{
      $path=$_POST["html"];
      $duration=$_POST["duration"];
      $file = "contents.js"; 
      $lines = file($file,FILE_SKIP_EMPTY_LINES);
      $lines= preg_replace('/];/','{url:"'.$path.'",duration:'.$duration.'},'."\n".'];',$lines);
      file_put_contents($file, $lines);  
  echo 'New Data Saved Successfully';
  break;
}

$line=(int)$_POST['hidden'];
$new=$_POST['duration'];
$new_url=$_POST['html'];
$myFile = "contents.js";
$fh = file($myFile,FILE_SKIP_EMPTY_LINES);
foreach ($fh as $key => $value){
	if($key===$line){
   
   $ar=explode(",",$value);
   $pos3= stripos($ar[0], ":");
   #$url=substr($ar[0],$pos3+2,-1);
   $url=substr($ar[0],0,$pos3+2).$new_url.'"';
   $ar[0]=$url;
   $pos= stripos($ar[1], ":");
   $pos1= stripos($ar[1], "}");
   $stri=substr($ar[1],0,$pos).":".$new.substr($ar[1],$pos1,-1)."}";
   $ar[1]=$stri;
   $new_str=implode(",",$ar);
   $fh[$key]=$new_str;
   #file_put_contents($filename, implode('', $array)).
   file_put_contents($myFile, implode('', $fh));
   echo 'Data Save Successfully';
   //echo $_POST['hidden'];

   }
  
}
}


  //echo 'Data Save Successfully';
?>