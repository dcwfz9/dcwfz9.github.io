$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true});

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});

function submitForm(){
	var action_link = window.atob("aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vY29udGFjdEBkZXJla3dlbHR5LmNvbQ==");
	$("#contactForm").attr('action', action_link);
    $("#contactForm").submit();
}