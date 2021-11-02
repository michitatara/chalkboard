$(function(){
    $('form').on('submit',function(){
        event.preventDefault();
        var value=$("input[name=usertype]:checked").val();
        switch(value){
            case "admin":  location.href='AdminHomePage.html'; break;
            case "hod":  location.href='TeacherHomepage.html.html'; break;
            case "tstaff":  location.href='StudentHomePage.html'; break;

        }
    });
});