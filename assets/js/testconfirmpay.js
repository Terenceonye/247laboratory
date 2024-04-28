const user_Id = localStorage.getItem('key');
console.log('The unique user ID is:', user_Id);

// Redirect to sign-in page if user_Id is not found
if (!user_Id) {
    window.location.href = 'signin.html';
} else {
    document.addEventListener('DOMContentLoaded', () => {
        // Update navigation bar based on authentication status
        if (user_Id) {
            document.querySelector('.nav-btn').innerHTML = `<a href="#" class="btn btn-brand ms-lg-2" id="logout">Logout</a>`;
        } else {
            document.querySelector('.nav-btn').innerHTML = `<a href="signin.html" class="ms-lg-2" id="signin" style="color: #000; font-weight: 600;">Sign In</a>
                <a href="signup.html" class="btn btn-brand ms-lg-2">Sign Up</a>`;
        }

        // Manage logout clicks
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('key');
                window.location.href = 'index.html';
            });
        }
    });
}
