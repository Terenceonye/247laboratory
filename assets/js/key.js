const key = localStorage.getItem('key');
        if (!key) {
            window.location.href = './signin.html'
        }