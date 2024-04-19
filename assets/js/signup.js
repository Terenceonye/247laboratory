
        // Set max date for date of birth field to today
            var today = new Date().toISOString().split('T')[0];
            document.getElementById("dob").setAttribute('max', today);


        document.getElementById("submit-button").addEventListener("click", async function (event) {
            event.preventDefault(); // Prevent default form submission

            // Retrieve form data
            var formData = {
                fname: document.getElementById("fname").value.trim(),
                lname: document.getElementById("lname").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                email: document.getElementById("email").value.trim(),
                dob: document.getElementById("dob").value.trim(),
                statename: document.getElementById("statename").value.trim(),
                areaid: document.getElementById("areaid").value.trim(),
                streetaddress: document.getElementById("streetaddress").value.trim(),
                password: document.getElementById("password").value.trim(),
                password2: document.getElementById("password2").value.trim()
            };

            // Validate form data
            var errors = validateForm(formData);

            // Display errors, if any
            displayErrors(errors);

            // If no errors, submit form data
            if (Object.keys(errors).length === 0) {
                try {
                    await submitFormData(formData);
                    console.log("Form submitted successfully");
                } catch (error) {
                    console.error("Error submitting form:", error);
                }
            }
        });

        function validateForm(formData) {
            var errors = {};

            // Validate first name
            if (formData.fname === "") {
                errors.fname = "First name is required";
            }

            // Validate last name
            if (formData.lname === "") {
                errors.lname = "Last name is required";
            }

            // Validate phone number (simple validation)
            if (!/^0[789]\d{9}$/.test(formData.phone)) {
                errors.phone = "Invalid phone number";
            }

            // Validate email address (simple validation)
            if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                errors.email = "Invalid email address";
            }

            // Validate date of birth
            if (formData.dob === "") {
                errors.dob = "Date of birth is required";
            }

            // Validate state name
            if (formData.statename === "") {
                errors.statename = "State name is required";
            }

            // Validate area ID
            if (formData.areaid === "") {
                errors.areaid = "Area ID is required";
            }

            // Validate street address
            if (formData.streetaddress === "") {
                errors.streetaddress = "Street address is required";
            }

             // Validate password length
            if (formData.password.length < 8) {
                errors.password = "Password must be at least 8 characters long";
            }

            // Validate password
            if (formData.password === "") {
                errors.password = "Password is required";
            } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+=\[\]{}|\\:;\"'<>,.\/?~])/.test(formData.password)) {
                errors.password = "Password must contain at least one capital letter, one number, and one special character";
            }

            // Validate password confirmation
            if (formData.password2 === "") {
                errors.password2 = "Password confirmation is required";
            } else if (formData.password !== formData.password2) {
                errors.password2 = "Passwords do not match";
            }

            return errors;
        }

        function displayErrors(errors) {
                // Reset error styles for all input fields
                var inputFields = document.querySelectorAll('.form-control');
                inputFields.forEach(function (input) {
                    input.classList.remove('is-invalid')
                    
                });

                // Clear error messages for all fields
                var errorElements = document.querySelectorAll('.error-text');
                errorElements.forEach(function (error) {
                    error.innerText = '';
                });

                // Display errors for invalid fields
                for (const [key, value] of Object.entries(errors)) {
                    const inputElement = document.getElementById(key);
                    const errorElement = document.getElementById(`${key}-error`);
                    inputElement.classList.add('is-invalid');
                    errorElement.innerText = value;
                }
            }


        async function submitFormData(formData) {
            // Remove the password2 field from formData if it matches the password field
            if (formData.password === formData.password2) {
                delete formData.password2;
            }

            // Submit form data to the server
            try {
                const response = await fetch('http://247laboratory.net/branches/createpatientaccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('A network error occurred');
                }

                // Parse the response as text
                const data = await response.text();

                // Check the response contents
                if (data === 'email already exists') {
                    // Handle 'email already exists' response
                    displayAlert('danger', 'Registration failed: Email already exists');
                } else if (!isNaN(parseInt(data))) {
                    // Handle user ID (integer) response
                    displayAlert('success', 'Registration successful.');
                } else {
                    // Handle unexpected response types
                    throw new Error('Unexpected response format. Please try again later.');
                }
            } catch (error) {
                console.error('Error during form submission:', error);
                displayAlert('danger', 'Sign-up failed: An error occurred. Please try again.');
            }

        }


        //ALERT - SUCCESS AND ERROR
         function displayAlert(type, message) {
                const alertContainer = document.getElementById('alert-container');
                const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                              ${message}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
                alertContainer.innerHTML = alert;
            }
