window.onload=function(){
	var delay=500; //1 seconds

setTimeout(function(){

if($('.at-form')){

$('.at-form').attr('class','at-form container');
console.log("Changed");


$('.at-title').attr('class','at-title center-align');
$('.at-error').attr('class','at-error center-align');
$('.at-sep').attr('class','at-sep center-align');
$('.at-oauth').attr('class','at-oauth center-align');
$('.at-input').attr('class','at-input center-align');
$('.at-resend-verification-email-link').attr('class','at-resend-verfication-email-link center-align');
$('.at-signup-link').attr('class','at-signup center-align');
$('.at-pwd-form').attr('class','at-pwd-form center-align');
$('.at-btn').attr('class','at-btn cait');
$('.at-pwd-link p').attr('class','center-align');

}



  //your code to be executed after 1 seconds
}, delay); 


}