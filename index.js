var containerImg = document.querySelector('.container-img');
var netflixOrigImg = document.querySelector('.netflix-orig-img');
var cover = document.querySelector('.cover');

var apiKey = '538dc322c0b43d2bcfcc98852172bf3e';
let isDragging = false;
let startPosition;
let currentTranslate = 0;

function grabThings(selector) {
    selector.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPosition = e.pageX - selector.offsetLeft;
    });
    
    selector.addEventListener('mouseup', () => {
        isDragging = false;
        currentTranslate = selector.scrollLeft;
    });
    
    selector.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
    
        const currentPosition = e.pageX - selector.offsetLeft;
    
        const distance = currentPosition - startPosition;
        selector.scrollLeft = currentTranslate - distance;
    });    
}

grabThings(containerImg);
(
    async function netflixOrigSlider() {
        try {
                
          await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('Something went wrong!');
                    }
                })
                .then(data => {
                    data.results.forEach(element => {
                        var img = document.createElement('img');
                        img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
                        img.alt = element.original_title;
                        img.setAttribute('draggable', false);
                        img.className = 'item';
                        containerImg.appendChild(img);
                    });
                })
        
        } catch (error) {
                console.error(error);
            }
        }
)();

(   
    async function movieRandomDay() {
        try {
           await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Something went wrong!');
                    }
                })
                .then(data => {
                    var random = Math.floor(Math.random() * data.results.length);
                    var div = document.createElement('div');
                        div.className = 'featured';
                        div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[random].backdrop_path})`;
                        cover.appendChild(div);

                    var h1 = document.createElement('h1');
                    var p = document.createElement('p');
                    var span = document.createElement("span");
                    var btnPlay = document.createElement('button');
                    var btnAddTolist = document.createElement('button');
                    var btnContainer = document.createElement('div');

                    span.innerHTML = `<svg width="24" height="24" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_46_2)">
                    <path d="M23.1073 1.3125C22.7209 0.510417 21.9042 0 21.0073 0C20.1104 0 19.3011 0.510417 18.9073 1.3125L14.2188 10.9594L3.74795 12.5052C2.87295 12.6365 2.14378 13.249 1.87399 14.0875C1.6042 14.926 1.82295 15.8521 2.45003 16.4719L10.0479 23.9896L8.2542 34.6135C8.10836 35.4885 8.47295 36.3781 9.19482 36.8958C9.9167 37.4135 10.8719 37.4792 11.6594 37.0635L21.0146 32.0687L30.3698 37.0635C31.1573 37.4792 32.1125 37.4208 32.8344 36.8958C33.5563 36.3708 33.9209 35.4885 33.775 34.6135L31.974 23.9896L39.5719 16.4719C40.199 15.8521 40.425 14.926 40.1479 14.0875C39.8709 13.249 39.149 12.6365 38.274 12.5052L27.7959 10.9594L23.1073 1.3125Z" fill="#FFCD05" fill-opacity="0.702"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_46_2">
                    <rect width="42" height="37.3333" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    ${data.results[random].popularity}`;
                    btnPlay.innerHTML = `<svg width="18" height="24" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5625 2.43744C3.6375 1.86869 2.475 1.84994 1.53125 2.38119C0.5875 2.91244 0 3.91244 0 4.99994V26.9999C0 28.0874 0.5875 29.0874 1.53125 29.6187C2.475 30.1499 3.6375 30.1249 4.5625 29.5624L22.5625 18.5624C23.4563 18.0187 24 17.0499 24 15.9999C24 14.9499 23.4563 13.9874 22.5625 13.4374L4.5625 2.43744Z" fill="white"/>
                    </svg>
                     Play`;
                     btnAddTolist.innerHTML = `
                     <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10.2857 3.21418C10.2857 2.50302 9.71113 1.92847 8.99997 1.92847C8.2888 1.92847 7.71425 2.50302 7.71425 3.21418V8.9999H1.92854C1.21738 8.9999 0.642822 9.57445 0.642822 10.2856C0.642822 10.9968 1.21738 11.5713 1.92854 11.5713H7.71425V17.357C7.71425 18.0682 8.2888 18.6428 8.99997 18.6428C9.71113 18.6428 10.2857 18.0682 10.2857 17.357V11.5713H16.0714C16.7826 11.5713 17.3571 10.9968 17.3571 10.2856C17.3571 9.57445 16.7826 8.9999 16.0714 8.9999H10.2857V3.21418Z" fill="white"/>
                     </svg>
                     Add List                     
                     `;
                    btnPlay.className = 'btnPlay';
                    btnAddTolist.className = 'btnAddTolist';
                    btnContainer.className = 'btnContainer';
                    h1.innerHTML = data.results[random].title
                    p.innerHTML = data.results[random].overview;
                    div.appendChild(span);
                    div.appendChild(h1);
                    div.appendChild(p)
                    btnContainer.appendChild(btnPlay);
                    btnContainer.appendChild(btnAddTolist);
                    div.appendChild(btnContainer);
                })
        } catch (error) {
            console.error(error)
        }
    }
)();

grabThings(netflixOrigImg);
(
    async function netflixOrigSlider() {
        try {
                
          await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('Something went wrong!');
                    }
                })
                .then(data => {
                    data.results.forEach(element => {
                        var img = document.createElement('img');
                        img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
                        img.alt = element.original_title;
                        img.setAttribute('draggable', false);
                        img.className = 'item2';
                        netflixOrigImg.appendChild(img);
                    });
                })
        
        } catch (error) {
                console.error(error);
            }
        }
)();