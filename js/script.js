const articles = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');
let html = '';

function generateTitleLinks() {
    /* for each article */
    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        const articleTitle = article.querySelector('.post-title').innerHTML;
        /* create HTML of the link */
        const linkHTML = '<li><a href=#' + articleId + '><span>' + articleTitle + '</span></a></li>';
        /* insert link into html variable */
        html = html + linkHTML;
        titleList.innerHTML = html;
    }
}
generateTitleLinks();

const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}


