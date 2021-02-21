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

const generateTags = function () {
    const tagsList = document.querySelector('.tags.list');
    tagsList.innerHTML = '';
    const tablica = []
    for (let article of articles) {
        const articleTagsList = article.querySelector('.post-tags .list');
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);
        const articleTagsArray = articleTags.split(' ');
        tablica.push(articleTagsArray);
        for (let tag of articleTagsArray) {
            const linkHTMLWithTag = '<li><a href=#tag-' + tag + '><span>' + tag + '</span></a></li>';
            articleTagsList.insertAdjacentHTML('beforeend', linkHTMLWithTag);
        }
    }
    const arrayWithAllTags = [].concat.apply([], tablica);
    const finalArray = [];
    let i = 0
    for (let element of arrayWithAllTags) {
        if (finalArray.indexOf(arrayWithAllTags[i]) === -1) {
            finalArray.push(arrayWithAllTags[i]);
        }
        i++;
    }

    const allTagsHTML = [];
    const copy = arrayWithAllTags.slice(0);
    i = 0
    for (let element of arrayWithAllTags) {
        let myCount = 0;

        for (var w = 0; w < copy.length; w++) {
            if (arrayWithAllTags[i] == copy[w]) {
                myCount++;
                delete copy[w];
                w++
            }
        }
        if (myCount > 0) {
            allTagsHTML.push(myCount);
        }
        i++
    }

    let i1 = 0;
    for (let elementInFinalArray of finalArray) {
        const linkHTMLWithTagFromArticle = '<li><a href="#tag-' + finalArray[i1] + '" class= tag-size-' + allTagsHTML[i1] + '>' + finalArray[i1] + '</a> <span></span></li > ';
        tagsList.insertAdjacentHTML('beforeend', linkHTMLWithTagFromArticle);
        i1++;
    }
}
generateTags();

const tagClickHandler = function (event) {
    titlesOfArticles.innerHTML = '';
    const clickedTag = this;
    const tagOfArticle = clickedTag.getAttribute('href').replace('#tag-', '');
    console.log(tagOfArticle);
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

function addClickListenersToTagsList() {
    const linksFromTagList = document.querySelectorAll('.list.tags a')
    for (let linkFromTagList of linksFromTagList) {
        linkFromTagList.addEventListener('click', tagClickHandler);
    }
}
addClickListenersToTagsList();

function addClickListenersToTags() {
    const linksFromTags = document.querySelectorAll('.post-tags a')
    for (let linkFromTags of linksFromTags) {
        linkFromTags.addEventListener('click', tagClickHandler);
    }
}
addClickListenersToTags();

//AUTHORS//

const addAuthorToArticle = function () {
    const authorsList = document.querySelector('.authors')
    const arrayWithAllAuthors = []
    for (let article of articles) {
        const author = article.getAttribute('data-author');
        const authorInHref = author.replace(' ', '-').toLowerCase();
        const titles = article.querySelector('.post-author');
        let linkHTMLWithAuthor = 'by ' + '<a href=#' + authorInHref + '>' + author + '</a>'
        titles.innerHTML = linkHTMLWithAuthor;
        arrayWithAllAuthors.push(author);
    }
    console.log(arrayWithAllAuthors);
    let i = 0;
    const finalArrayWithAuthors = [];
    for (let element of arrayWithAllAuthors) {
        if (finalArrayWithAuthors.indexOf(arrayWithAllAuthors[i]) === -1) {
            finalArrayWithAuthors.push(arrayWithAllAuthors[i]);
        }
        i++;
    }

    const authorsLinks = [];
    let i3 = 0
    for (let elemenetInfinalArrayWithAuthors of finalArrayWithAuthors) {
        authorsLinks.push(finalArrayWithAuthors[i3].replace(' ', '-').toLowerCase());
        i3++;
    }

    const authorsCount = [];
    const copy = arrayWithAllAuthors.slice(0);
    let i1 = 0
    for (let element1 of arrayWithAllAuthors) {
        let myCount = 0;

        for (let w = 0; w < copy.length; w++) {
            if (arrayWithAllAuthors[i1] == copy[w]) {
                myCount++;
                delete copy[w];
            }
        }
        if (myCount > 0) {
            authorsCount.push(myCount);
        }
        i1++
    }

    let i2 = 0
    for (let elementInFinalArrayWithAuthors of finalArrayWithAuthors) {
        const linkHTMLWithAuthorsFromArticles = '<li><a href="#' + authorsLinks[i2] + '">' + finalArrayWithAuthors[i2] + '</a> <span>(' + authorsCount[i2] + ')</span></li > ';
        authorsList.insertAdjacentHTML('beforeend', linkHTMLWithAuthorsFromArticles);
        i2++;
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

const authorsOfArticlesFromList = document.querySelectorAll('.authors a')
for (let authorOfArticlesFromList of authorsOfArticlesFromList) {
    authorOfArticlesFromList.addEventListener('click', addAuthorsToList);
}
