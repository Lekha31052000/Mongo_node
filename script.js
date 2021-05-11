
$(document).ready(function(){
    $("#username_error_message").hide();
    $("#email_error_message").hide();
    $("#pass_error_message").hide();
    $("#conpass_error_message").hide();
    $("#dob_error_message").hide();
    $("#num_error_message").hide();

    var username_error=false;
    var email_error=false;
    var pass_error=false;
    var pwd_error=false;
    var conpass_error=false;
    var dob_error=false;
    var num_error=false;


    $("#fname").focusout(function(){
     
        check_uname();
    });

    $("#mail").focusout(function(){

        check_email();

    });
    $("#pass").focusout(function(){
        check_pass();

    });
    $("#pwd").focusout(function(){

        check_conpass();

    });
    $("#dob").focusout(function(){

        check_dob();

    });
    $("#num").focusout(function(){

      check_phone();

    });


    function check_uname()
    {
     
        let ulength=$("#fname").val().length;
        if(ulength < 5)
        {
            $("#username_error_message").html("Should be between 5-20 characters");
            $("#username_error_message").show();
            username_error=true;
        }
        else{
            $("#username_error_message").hide();
        }
        
    }





    function check_email()
    {
      
        let email=$("#mail").val();
        if((!email.includes("@"))||(!email.includes(".")))
        {
            $("#email_error_message").html("Invalid email! :(");
            $("#email_error_message").show();
            email_error=true;
        }
        else{
            $("#email_error_message").hide();
        }
        
    }


    function check_pass()
    {
      
        let len=$("#pass").val().length;
        if(len < 4)
        {
            $("#pass_error_message").html("Need atleast 4 characters!");
            $("#pass_error_message").show();
            pass_error=true;
        }
        else{
            $("#pass_error_message").hide();
        }
        
    }

    function check_conpass()
    {
        let pass=$("#pass").val();
        let pwd=$("#pwd").val();
        
        if(pwd!=pass)
        {
            $("#conpass_error_message").html("Incorrect password!");
            $("#conpass_error_message").show();
            pwd_error=true;
        }
        else
        {
            $("#conpass_error_message").hide();
        }
    }


    function check_dob()
    {
        let dob=$("#dob").val();
       
        if(!dob || isNaN(dob))
        {
            $("#dob_error_message").html("Enter DOB!");
            $("#dob_error_message").show();
            dob_error=true;
        }
        else
        {
            $("#dob_error_message").hide();
        }
    }




    function check_phone()
    {
        let num=$("#num").val();
       
        if(!num || num.length>10 || isNaN(num))
        {
            $("#num_error_message").html("Enter valid number!");
            $("#num_error_message").show();
            num_error=true;
        }
        else
        {
            $("#num_error_message").hide();
        }
    }



});


