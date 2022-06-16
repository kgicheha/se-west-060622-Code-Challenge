// write your code here

//GET DOM ELEMENTS
const title = document.querySelector('#card-title')
const mainImage = document.querySelector('#card-image')
const commentList = document.querySelector('#comments-list')
const likeCount = document.querySelector('#like-count')

const form = document.querySelector('#comment-form')

//DELETE previous data
commentList.innerHTML =''
title.innerHTML =''
likeCount.innerHTML = ''


//GET request to retrieve image and title of the dog

fetch('http://localhost:3000/images')
.then(response => response.json())
.then(data => data.forEach(renderImage))
// .then(data => {
//     console.log(data)

//     // title.textContent = data[0].title
//     // mainImage.src = data[0].image


//      //create DOM elements
//      const header = document.createElement('h2')
//      const dogImage = document.createElement('img')



//      //edit the content of the new elements
//      header.textContent = data[0].title
//      dogImage.src = data[0].image

//      //append data to DOM element
//     title.append(header)
//     mainImage.append(dogImage)
// })


//GET request to retrieve comments
fetch('http://localhost:3000/comments')
.then(response => response.json())
.then(data => data.forEach(renderComment))



/*FUNCTION TO GET DATA TO POPULAT */
function renderImage(object) {
    //create DOM elements
    const header = document.createElement('h2')
    const dogImage = document.createElement('img')
    const like = document.createElement('span')


    //edit the content of the new elements
    header.textContent = object.title
    dogImage.src = object.image
    like.textContent = object.likes

    //append data to DOM element
    title.append(header)
    mainImage.append(dogImage)
    likeCount.append(`${like} likes`)


}
//render comment on page
function renderComment(object) {

    const comment = document.createElement('li')

    comment.textContent = object.content

    commentList.append(comment)



}

form.addEventListener('submit', e => {
    e.preventDefault()

    const dogComment = e.target.comment.value

    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "imageId": 1,
            "content": dogComment
        })
    })
    .then(response => response.json())
    .then(data => data.forEach(renderComment))
})