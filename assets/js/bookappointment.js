 const user_Id = localStorage.getItem('key');

    // This code should be inside DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        // Check if user is authenticated and update navigation bar accordingly
        if (user_Id) {
            document.querySelector('.nav-btn').innerHTML = `<a href="#" class="btn btn-brand ms-lg-2" id="logout">Logout</a>`;

            // Add click event listener to logout button
            const logoutBtn = document.getElementById('logout');
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('key');
                window.location.href = './index.html' // Reload the page after logout
            });
        }


// Assuming `user_Id` is a global variable representing the patient ID


    // Get the form element
    const form = document.getElementById('appointment-form');

    // Add event listener for form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

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
    const apiUrl = 'https://247laboratory.net/branches/booksession'
    document.getElementById('spinner').classList.add('fa-spinner', 'fa-spin')

    try {
        // Make a POST request using fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Send data as JSON
            },
            body: JSON.stringify(data), // Convert data to JSON string
        });

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        const responseData = await response.json();
        displayAlert('success', 'Your Appointment was successful');
        console.log('Form submitted successfully:', responseData);
        // Handle success, e.g., redirect the user or display a success message

    } catch (error) {
        displayAlert('danger', 'An error was encounterd. Try again later');
        console.error('Error:', error);
        // Handle error, e.g., display an error message
    }
});


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





    });