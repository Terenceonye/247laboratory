        document.getElementById("submit-button").addEventListener("click", async function (event) {
            event.preventDefault(); // Prevent default form submission
            

            // Retrieve email from the form
            const username = document.getElementById("email").value.trim();

            // Validate the email address
            const errors = validateEmail(username);

            // Display errors, if any
            displayErrors(errors);

            // If no errors, submit email address
            if (Object.keys(errors).length === 0) {
                try {
                    await submitEmail(username);
                    console.log("Forgot password email sent successfully");
                } catch (error) {
                    console.error("Error submitting email:", error);
                }
            }
        });

        function validateEmail(username) {
            const errors = {};

            // Validate email address format
            if (!/^\S+@\S+\.\S+$/.test(username)) {
                errors.username = "Invalid email address";
            }

            return errors;
        }

        function displayErrors(errors) {
            // Reset error styles for the input field
            const inputField = document.getElementById("email");
            inputField.classList.remove('is-invalid');

            // Clear error messages
            const errorElement = document.getElementById("email-error");
            errorElement.innerText = '';

            // Display errors for invalid fields
            if (errors.username) {
                inputField.classList.add('is-invalid');
                errorElement.innerText = errors.username;
            }
        }

        async function submitEmail(username) {
            // Submit the email address to the server
            try {
                document.getElementById('spinner').classList.add('fa-spinner', 'fa-spin')
                const response = await fetch('http://247laboratory.net/branches/forgotpassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })
                });

                if (!response.ok) {
                    throw new Error('A network error occurred');
                }

                const data = await response.text();

                if (data === 'Email not found') {
                    displayAlert('danger', 'Email not found in our records');
                } else {
                    displayAlert('success', 'Password reset email sent. Please check your email for instructions.');
                }
            } catch (error) {
                console.error("Error submitting email:", error);
                displayAlert('danger', 'An error occurred. Please try again later.');
            }
        }

        // Function to display alerts
        function displayAlert(type, message) {
            const alertContainer = document.getElementById('alert-container');
            const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                          ${message}
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
            alertContainer.innerHTML = alert;

            document.getElementById('spinner').classList.remove('fa-spinner', 'fa-spin')
        }
