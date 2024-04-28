//  JavaScript Code 
   
        let user_Id;

        document.getElementById("submit-button").addEventListener("click", async function (event) {
            event.preventDefault(); // Prevent default form submission
            

            // Retrieve form data
            var formData = {
                username: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value.trim(),
            };

            // Validate form data
            var errors = validateForm(formData);

            // Display errors, if any
            displayErrors(errors);

            // If no errors, submit form data
            if (Object.keys(errors).length === 0) {
                try {
                    await submitFormData(formData);
                    console.log("Form sent");
                } catch (error) {
                    console.error("Error sedndingform:", error);
                }
            }
        });

        function validateForm(formData) {
            var errors = {};

            // Validate email address (simple validation)
            if (!/^\S+@\S+\.\S+$/.test(formData.username)) {
                errors.email = "Invalid email address";
            }

             // Validate password length
            if (formData.password.length < 8) {
                errors.password = "Password must be at least 8 characters long";
            }

            // Validate password (simple validation)
            if (formData.password === "") {
                errors.password = "Password is required";
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
            // Submit form data to the server
            try {
                document.getElementById('spinner').classList.add('fa-spinner', 'fa-spin')
                const response = await fetch('http://247laboratory.net/branches/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('A network Error has occurred');
                }

                const contentType = response.headers.get('Content-Type');
                console.log(contentType);
                
                data = await response.json();
                console.log(data)
                if(data === '"error: Invalid  login codes, Please try again."'){
                displayAlert('danger', 'Invalid login Credentials...');
                }else {
                
                displayAlert('success', `Login successful: Your ID is ${data.id}. Redirecting...`);
                document.getElementById('signin-form').reset();
                localStorage.setItem('key', data.id)
                setTimeout(()=> {
                    window.location.href = 'index.html'
                }, 2000)


                token = localStorage.getItem('key')
                console.log("User Id as key is", token);
                    
                } 
                
            } catch (error) {
                displayAlert('danger', 'Invalid login credentials. Please try again');
                console.error("Error signing in:", error);
            }
        }

        // ALERT - SUCCESS AND ERROR
        function displayAlert(type, message) {
            const alertContainer = document.getElementById('alert-container');
            const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                              ${message}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
                          document.getElementById('spinner').classList.remove('fa-spinner', 'fa-spin')
            alertContainer.innerHTML = alert;
        }
    