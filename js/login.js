$(document).ready(function() {
	// handle form submission
	$("#login-form").submit(function(event) {
		// prevent default form submission
		event.preventDefault();

		// get form data
		var username_email = $("#username_email").val();
		var password = $("#password").val();

		// send form data to backend for authentication
		$.ajax({
			type: "POST",
			url: "login.php",
			data: {username_email: username_email, password: password},
			success: function(response) {
				// show success or error message
				if (response == "success") {
					// store user information in browser local storage
					localStorage.setItem("username_email", username_email);
					window.location.href = "profile.php";
				} else {
					$("#message").html(response);
				}
			},
			error: function() {
				$("#message").html("An error occurred while processing your request.");
			}
		});
	});
});
