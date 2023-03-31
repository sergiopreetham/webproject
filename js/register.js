$(document).ready(function() {
	$("#myform").validate({
	  rules: {
		username: {
		  required: true,
		  minlength: 3
		},
		email: {
		  required: true,
		  email: true
		},
		password: {
		  required: true,
		  minlength: 6
		},
		confirm_password: {
		  required: true,
		  minlength: 6,
		  equalTo: "#password"
		},
		signupCheck: {
		  required: true
		}
	  },
	  messages: {
		username: {
		  required: "Please enter your full name",
		  minlength: "Your full name must consist of at least 3 characters"
		},
		email: {
		  required: "Please enter your email",
		  email: "Please enter a valid email address"
		},
		password: {
		  required: "Please provide a password",
		  minlength: "Your password must be at least 6 characters long"
		},
		confirm_password: {
		  required: "Please confirm your password",
		  minlength: "Your password must be at least 6 characters long",
		  equalTo: "Passwords do not match"
		},
		signupCheck: {
		  required: "Please accept our terms and conditions"
		}
	  },
	  submitHandler: function(form) {
		$.ajax({
		  url: 'register.php',
		  type: 'POST',
		  data: $(form).serialize(),
		  success: function(response) {
			if (response.success) {
			  alert('Registration successful');
			  window.location.href = 'login.html';
			} else {
			  alert('Registration failed: ' + response.message);
			}
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		  }
		});
	  }
	});
  })