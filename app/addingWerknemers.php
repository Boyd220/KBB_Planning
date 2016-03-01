<?php
if( $_POST )
{
  $con = mysql_connect("localhost","boyd","boyd");

  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
  }

  mysql_select_db("kbb", $con);

  $achternaam = $_POST['achternaam'];
  $voornaam = $_POST['voornaam'];
  $tel = $_POST['tel'];
  $werktel = $_POST['werktel'];
  $adres = $_POST['adres'];
  $huisnr = $_POST['huisnr'];
  $stad = $_POST['stad'];
  $afkomst = $_POST['afkomst'];
  $postcode = $_POST['postcode'];
  $comments = $_POST['comments'];

  $achternaam = mysql_real_escape_string($achternaam);
  $voornaam = mysql_real_escape_string($voornaam);
  $tel = mysql_real_escape_string($tel);
  $werktel = mysql_real_escape_string($werktel);
  $adres = mysql_real_escape_string($adres);
$huisnr = mysql_real_escape_string($huisnr);
$stad = mysql_real_escape_string($stad);
$afkomst = mysql_real_escape_string($afkomst);
$postcode = mysql_real_escape_string($postcode);
$comments = mysql_real_escape_string($comments);



  $query = "
  INSERT INTO `werknemers` (`id`, `achternaam`, `voornaam`, `tel`,
        `werktel`, `adres`, `huisnr`, 'stad', 'afkomst', 'postcode', 'comments') VALUES (NULL, '$achternaam',
        '$voornaam', '$tel', '$werktel',
        $adres, '$huisnr', $stad, $afkomst, $postcode, $comments);";

  mysql_query($query);

  mysql_close($con);
}
?>