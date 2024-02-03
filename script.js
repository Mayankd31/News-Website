const API_KEY = "84da248826e040019c981a3c72134433";
const url = "https://newsapi.org/v2/everything?q=";
const countryName = 'India';

window.addEventListener("load", () => {
    fetchNews(countryName);
}); 

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.querySelector(".template-news-card");

    cardsContainer.innerHTML = ""; 

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    if (newsImg) {
        newsImg.src = article.urlToImage;
    }

    if (newsTitle) {
        newsTitle.innerHTML = article.title;
    }

    if (newsDesc) {
        newsDesc.innerHTML = article.description;
    }

    if (newsSource) {
        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        newsSource.innerHTML = `${article.source.name} • ${date}`;
        cardClone.firstElementChild.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
    }
}

let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active'); // null nahi hai toh
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})

