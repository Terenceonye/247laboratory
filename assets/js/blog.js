        const baseImgPath = 'https://blog.247pharmacy.net/img/'
        const baseReadMorePath = 'https://blog.247pharmacy.net/news/'
        let display = ''
      const getblog = async () => {

        try {
            const res = await fetch('https://blog.247pharmacy.net/users/getblogs')
            if(!res.ok) throw new Error ('A network Error occurred')

            const data = await res.json()

            console.log(data)
            
            display = data.map((value, index) => {
                while(index < 3){ 
               return `<div class="col-md-4">
                        <article class="blog-box">
                            <div><img src="${baseImgPath}${value.newsimage}" alt="" width="100%"></div>
                            <div class="blog-content">
                                <div class="blog-date d-flex">
                                    <div><img src="assets/img/profile.png" alt="" width="20px"><span>Admin</span></div>
                                    <div><img src="assets/img/calendar.png" alt="" width="20px"><span>${value.dateposted.split('T')[0]}</div>                                    
                                </div>
                                <div class="blog-text">
                                    <h4>${value.title}</h4>
                                    <p>${value.details.slice(0,100)}&hellip;</p>
                                </div>
                                <div class="blog-end d-flex justify-content-between align-items-center">
                                    <div class="readbtn"><a href="${baseReadMorePath}${value.id}/${value.title.replace(/%/g, '-')}.">Read More</a>&nbsp&nbsp&nbsp<i class="fa-solid fa-arrow-right"></i></div>
                                    <div class="blog-icon">
                                        <div><i class="fa-solid fa-eye"></i><span>${value.viewcount}</span></div>
                                        <div><i class="fa-solid fa-share-nodes"></i><span>7</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>                        
                    </div> 
               `
            }}).join('')
            console.log(display)
            document.getElementById('blog-posts').innerHTML = display
            
            
        } catch (error) {
            console.log(error.message)
            console.log("Faild Fetch")
        }

      }

      getblog();
   