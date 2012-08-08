<?php

/**
 * @author Arpit Srivastava
 * @contact arpit243835@gmail.com
 * @copyright 2012
 */
if(isset($_POST['hidden']))
{
  $line=(int)$_POST['hidden'];
  $duration=$_POST['duration'];
   $path=$_POST['html'];
   $myFile = "contents.js";
   $fh = file($myFile);
    foreach ($fh as $key => $value){
	if($key===$line){
	   $ar=explode(",",$value);
           $ar[0]="";
           $ar[1]="";
	       $new_str=implode("",$ar);
           $fh[$key]=$new_str;
           file_put_contents($myFile, implode('', $fh));
           echo 'Delete playlist successfully'; 
	   } 
    }
    //echo 'Delete playlist successfully'; 
}
    


?>