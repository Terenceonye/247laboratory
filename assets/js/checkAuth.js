 // Get user ID from localStorage
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

                // Add click event listener to the book appointment button
                const bookAppointmentBig = document.querySelector('.book-btn-big');
                const bookAppointmentSmall = document.querySelector('.book-btn-small')

                if (bookAppointmentBig) {
                    bookAppointmentBig.addEventListener('click', () => {
                        checkAuth('./payment.html');
                    });
                }

                if (bookAppointmentSmall) {
                    bookAppointmentSmall.addEventListener('click', () => {
                        checkAuth('./payment.html');
                    });
                }


            });

            // Function to store the target URL and redirect to the login page
            function storeRequestedPage(targetUrl) {
                localStorage.setItem('requestedPage', targetUrl); // Store target URL
                window.location.href = './signin.html'; // Redirect to login page
            }

            // Function to check authentication and redirect
            function checkAuth(targetUrl) {
                const user_Id = localStorage.getItem('key'); // Get the user ID
                if (!user_Id) {
                    // If not authenticated, store target URL and redirect to login page
                    storeRequestedPage(targetUrl);
                } else {
                    // If authenticated, directly redirect to target URL
                    window.location.href = targetUrl;
                }
            }