$(function(){
    $('form').on('submit',function(){
        event.preventDefault();
        var value=$("input[name=usertype]:checked").val();
        switch(value){
            case "admin":  location.href='AdminHomePage.html'; break;
            case "teacher":  location.href='TeacherHomepage.html'; break;
            case "student":  location.href='StudentHomePage.html'; break;

        }
    });
});