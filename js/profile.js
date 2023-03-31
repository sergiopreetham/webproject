$(document).ready(function() {
	// get user data from local storage
	var userData = JSON.parse(localStorage.getItem('userData'));
	// populate the form fields with the retrieved data
	$('#age').val(userData.age);
	$('#dob').val(userData.dob);
	$('#contact').val(userData.contact);

	// handle form submission
	$('#profile-form').submit(function(event) {
		event.preventDefault(); // prevent default form submission
		// get form data
		var age = $('#age').val();
		var dob = $('#dob').val();
		var contact = $('#contact').val();
		// prepare data to be sent to backend
		var data = {
			age: age,
			dob: dob,
			contact: contact,
			username: userData.username
		};
		// send data to backend using AJAX
		$.ajax({
			url: 'update_profile.php',
			type: 'POST',
			data: data,
			dataType: 'json',
			success: function(response) {
				if (response.success) {
					alert('Profile updated successfully');
					// update user data in local storage
					userData.age = age;
					userData.dob = dob;
					userData.contact = contact;
					localStorage.setItem('userData', JSON.stringify(userData));
				} else {
					alert('Error updating profile');
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	});
});
