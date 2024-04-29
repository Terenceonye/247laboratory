document.addEventListener('DOMContentLoaded', () => {
    // Get user ID from localStorage
    const user_Id = localStorage.getItem('key');

    // Check if user is authenticated and update navigation bar accordingly
    if (user_Id) {
        document.querySelector('.nav-btn').innerHTML = `<a href="#" class="btn btn-brand ms-lg-2" id="logout">Logout</a>`;

        // Add click event listener to logout button
        const logoutBtn = document.getElementById('logout');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('key');
            window.location.href = './index.html'; // Redirect to index.html after logout
        });
    }

    // Get the form element
    const form = document.getElementById('appointment-form');

    // Add event listener for form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Validate the form
        const isValid = checkValidation();

        // If the form is not valid, stop the form submission
        if (!isValid) {
            return;
        }

        // Collect form data
        const serviceid = document.getElementById('serviceid').value;
        const bookedfrom = document.getElementById('bookedfrom').value;
        const homeservice = document.getElementById('homeservice').value;

        // Create an object with the data to be sent to the API
        const data = {
            patientid: user_Id,
            bookedfrom: bookedfrom,
            serviceid: serviceid,
            homeservice: homeservice,
        };

        // API endpoint URL
        const apiUrl = 'https://247laboratory.net/branches/booksession';

        try {
            // Show loading spinner
            document.getElementById('spinner').classList.add('fa-spinner', 'fa-spin');
            
            // Make a POST request using fetch
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send data as JSON
                },
                body: JSON.stringify(data) // Convert data to JSON string
            });

            // Check if the response is ok (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response as JSON
            const responseData = await response.json();
            localStorage.setItem('ref', responseData.ref)
            displayAlert('success', 'Confirm Your details! Redirecting...');
             // Redirect to success booking page

            console.log('Form submitted successfully:', responseData);
            // Handle success, e.g., redirect the user or display a success message

        } catch (error) {
            displayAlert('danger', 'An error occurred. Please try again later.');
            console.error('Error:', error);
            // Handle error, e.g., display an error message
        }
    });

    // Add event listener for location change
    const bookedfromInput = document.getElementById('bookedfrom');
    bookedfromInput.addEventListener('change', function() {
        const homeserviceInput = document.getElementById('homeservice');
        const homeServiceOption = document.querySelector('#homeservice option[value="0"]'); // "Home Service" option
        const notHomeServiceOption = document.querySelector('#homeservice option[value="1"]'); // "Not Home Service" option

        // Check if the selected location is "Imo State"
        if (bookedfromInput.value === "0") { // Imo State is represented by the value "0"
            // Disable the Home Service option and enable the Not Home Service option
            homeServiceOption.disabled = true;
            notHomeServiceOption.disabled = false;
            homeserviceInput.value = "1"; // Set to "Not Home Service" by default
        } else {
            // Enable both Home Service and Not Home Service options
            homeServiceOption.disabled = false;
            notHomeServiceOption.disabled = false;
        }
    });
});

function displayAlert(type, message) {
    const alertContainer = document.getElementById('alert-container');
    const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      ${message}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;
    document.getElementById('spinner').classList.remove('fa-spinner', 'fa-spin');
    alertContainer.innerHTML = alert;
}

// Define the checkValidation function
function checkValidation() {
    // Get form inputs
    const serviceid = document.getElementById('serviceid').value;
    const bookedfrom = document.getElementById('bookedfrom').value;
    const homeservice = document.getElementById('homeservice').value;

    let isValid = true; // Assume the form is valid at the beginning

    // Check if serviceid is empty
    if (!serviceid) {
        document.getElementById('serviceid-error').innerHTML = 'Please select an appointment type';
        document.getElementById('serviceid-error').classList.add('text-error');
        isValid = false;
    } else {
        // Clear previous error messages and classes
        document.getElementById('serviceid-error').innerHTML = '';
        document.getElementById('serviceid-error').classList.remove('text-error');
    }

    // Check if bookedfrom is empty
    if (!bookedfrom) {
        document.getElementById('bookedfrom-error').innerHTML = 'Please select your state';
        document.getElementById('bookedfrom-error').classList.add('text-error');
        isValid = false;
    } else {
        // Clear previous error messages and classes
        document.getElementById('bookedfrom-error').innerHTML = '';
        document.getElementById('bookedfrom-error').classList.remove('text-error');
    }

    // Check if homeservice is empty
    if (!homeservice) {
        document.getElementById('homeservice-error').innerHTML = 'Please select a service type';
        document.getElementById('homeservice-error').classList.add('text-error');
        isValid = false;
    } else {
        // Clear previous error messages and classes
        document.getElementById('homeservice-error').innerHTML = '';
        document.getElementById('homeservice-error').classList.remove('text-error');
    }

    return isValid;
}
