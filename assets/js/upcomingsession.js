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


        async function getUpcomingSessons() {
            const url = 'https://247laboratory.net/branches/getsessioninfo/${user_Id}'
            try {
                const response = await fetch(url)
                if(!response.ok) throw new Error( 'There was a network Error')

                const data = await response.json()

                console.log(data)
            } catch (error) {
                console.log('There was an Error', error.message)
            }
        }
        
        getUpcomingSessons();
    });