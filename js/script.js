'use strict';
const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagscloud: Handlebars.compile(document.querySelector('#template-tagscloud-link').innerHTML),
    authorList: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML),
    articlesListFromTags: Handlebars.compile(document.querySelector('#template-articlesList-link').innerHTML),
    articlesListFromAuthors: Handlebars.compile(document.querySelector('#template-articlesList2-link').innerHTML),
}

const articles = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');
const titlesOfArticles = document.querySelector('.titles');

const generateTitleLinks = function () {
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;
        const linkHTMLData = { id: articleId, title: articleTitle };
        const linkHTML = templates.articleLink(linkHTMLData);
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
}
generateTitleLinks();

const titleClickHandler = function (event) {
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
        const articleTagsArray = articleTags.split(' ');
        tablica.push(articleTagsArray);
        for (let tag of articleTagsArray) {
            const linkHTMLData2 = { taghref: tag, tag: tag };
            const linkHTML2 = templates.tagLink(linkHTMLData2);
            articleTagsList.insertAdjacentHTML('beforeend', linkHTML2);
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
        const linkHTMLData4 = { tagscloudName: finalArray[i1], tagSize: allTagsHTML[i1] };
        const linkHTML4 = templates.tagscloud(linkHTMLData4);
        tagsList.insertAdjacentHTML('beforeend', linkHTML4);
        i1++;
    }
}
generateTags();

const tagClickHandler = function (event) {
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
                const linkHTMLData6 = { articleLinkFromTag: arrayWithid[i], articleNameFromTag: numberOfArticle };
                const linkHTML6 = templates.articlesListFromTags(linkHTMLData6);
                titlesOfArticles.insertAdjacentHTML('beforeend', linkHTML6);
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
        const linkHTMLData3 = { authorhref: authorInHref, author: author };
        const linkHTML3 = templates.authorLink(linkHTMLData3);
        titles.innerHTML = linkHTML3;
        arrayWithAllAuthors.push(author);
    }
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
        const linkHTMLData5 = { authorLink: authorsLinks[i2], authorName: finalArrayWithAuthors[i2], authorCount: authorsCount[i2] };
        const linkHTML5 = templates.authorList(linkHTMLData5);
        authorsList.insertAdjacentHTML('beforeend', linkHTML5);
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
        if (dataAuthor === authorFromTitle) {
            let numberOfArticleFromAuthor = arrayWithidFromAuthor[i].replace('-', ' ').charAt(0).toUpperCase() + arrayWithidFromAuthor[i].replace('-', ' ').slice(1);
            const linkHTMLData7 = { articleLinkFromAuthor: arrayWithidFromAuthor[i], articleNameFromAuthor: numberOfArticleFromAuthor };
            const linkHTML7 = templates.articlesListFromAuthors(linkHTMLData7);
            titlesOfArticles.insertAdjacentHTML('beforeend', linkHTML7);
            articlesActive.push(arrayWithidFromAuthor[i]);
        }
    }

    const targetArticlebylink = document.getElementById(articlesActive[0]);
    targetArticlebylink.classList.add('active');

    const titleClickHandlerbyLinks = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log(clickedElement);
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
