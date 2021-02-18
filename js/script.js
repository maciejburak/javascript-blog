'use strict';
const articles = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');
const titlesOfArticles = document.querySelector('.titles');

const generateTitleLinks = function () {
    /* for each article */
    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        const articleTitle = article.querySelector('.post-title').innerHTML;
        /* create HTML of the link */
        const linkHTML = '<li><a href=#' + articleId + '><span>' + articleTitle + '</span></a></li>';
        /* insert link into html variable */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
}
generateTitleLinks();

const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
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
};

const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

//TAGS//

function generateTags() {
    for (let article of articles) {
        const articleTagsList = article.querySelector('.post-tags .list');
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        for (let tag of articleTagsArray) {
            const linkHTMLWithTag = '<li><a href=#tag-' + tag + '><span>' + tag + '</span></a></li> <br>';
            articleTagsList.insertAdjacentHTML('beforeend', linkHTMLWithTag);
        }
    }
}
generateTags();

function tagClickHandler(event) {
    titlesOfArticles.innerHTML = '';
    const clickedTag = this;
    const tagOfArticle = clickedTag.getAttribute('href').replace('#tag-', '');
    const finalArrayWithTitles = [];
    for (let article of articles) {
        article.classList.remove('active');
        const dataTags = article.getAttribute('data-tags');
        const exactlyThis = dataTags.includes(tagOfArticle)
        const idofArticle = article.getAttribute('id')
        const arrayWithid = []
        arrayWithid.push(idofArticle);
        for (let element of arrayWithid) {
            let i = 0;
            if (exactlyThis === true) {
                const numberOfArticle = arrayWithid[i].replace('-', ' ').charAt(0).toUpperCase() + arrayWithid[i].replace('-', ' ').slice(1);
                const linkHTMLWithTag = '<li><a href=#' + arrayWithid[i] + '><span>' + numberOfArticle + '</span></a></li>';
                titlesOfArticles.insertAdjacentHTML('beforeend', linkHTMLWithTag);
                finalArrayWithTitles.push(arrayWithid[i])

            }
        }

    }

    const firstArticleWithActive = document.getElementById(finalArrayWithTitles[0]);
    firstArticleWithActive.classList.add('active');

    const titleClickHandlerbyLinks = function (event) {
        const clickedElement = this;
        event.preventDefault();
        clickedElement.classList.add('active');
        const activeArticles = document.querySelectorAll('.posts .active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        const articleSelector = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(articleSelector);
        targetArticle.classList.add('active');
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandlerbyLinks);
    }
}

function addClickListenersToTags() {
    const linksFromTags = document.querySelectorAll('.post-tags a')
    for (let linkFromTags of linksFromTags) {
        linkFromTags.addEventListener('click', tagClickHandler);
    }
}
addClickListenersToTags();

//AUTHORS//

const addAuthorToArticle = function () {
    for (let article of articles) {
        const author = article.getAttribute('data-author');
        const authorInHref = author.replace(' ', '-').toLowerCase();
        const titles = article.querySelector('.post-author');
        let linkHTMLWithAuthor = 'by ' + '<a href=#' + authorInHref + '>' + author + '</a>'
        titles.innerHTML = linkHTMLWithAuthor;
    }
}
addAuthorToArticle()

const addAuthorsToList = function (event) {
    event.preventDefault();
    titlesOfArticles.innerHTML = '';
    const clickedAuthor = this;
    const authorFromTitle = clickedAuthor.innerHTML;
    const articlesActive = [];
    let i = 0;
    for (let article of articles) {
        article.classList.remove('active');
        const dataAuthor = article.getAttribute('data-author');
        const idOfArticleFromAuthor = article.getAttribute('id');
        const arrayWithidFromAuthor = []
        arrayWithidFromAuthor.push(idOfArticleFromAuthor);
        //console.log(arrayWithid);

        if (dataAuthor === authorFromTitle) {
            let numberOfArticleFromAuthor = arrayWithidFromAuthor[i].replace('-', ' ').charAt(0).toUpperCase() + arrayWithidFromAuthor[i].replace('-', ' ').slice(1);
            //console.log(numberOfArticle);
            let linkHTMLWithArticle = '<li><a href=#' + arrayWithidFromAuthor[i] + '><span>' + numberOfArticleFromAuthor + '</span></a></li>';
            titlesOfArticles.insertAdjacentHTML('beforeend', linkHTMLWithArticle);
            articlesActive.push(arrayWithidFromAuthor[i]);
        }
    }
    const targetArticlebylink = document.getElementById(articlesActive[0]);
    targetArticlebylink.classList.add('active');

    const titleClickHandlerbyLinks = function (event) {
        event.preventDefault();
        const clickedElement = this;
        clickedElement.classList.add('active');
        const activeArticles = document.querySelectorAll('.posts .active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        const articleSelector = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(articleSelector);
        targetArticle.classList.add('active');
    };

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandlerbyLinks);
    }
}

const authorsOfArticles = document.querySelectorAll('.post-author a')
for (let authorOfArticles of authorsOfArticles) {
    authorOfArticles.addEventListener('click', addAuthorsToList);
}

