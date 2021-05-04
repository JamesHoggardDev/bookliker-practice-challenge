const bookUl = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(booksArr => {
        booksArr.forEach(bookObj => listOneBook(bookObj))
    })

    function listOneBook(bookObj){
        const detLi = document.createElement('li')
            detLi.dataset.id = bookObj.id
            detLi.textContent = bookObj.title
            detLi.addEventListener('click', () =>{
                makeShowDiv(bookObj)
            })   
            bookUl.append(detLi)
    }

function makeShowDiv(bookObj){
    let showImg = document.createElement('img')
        showImg.src = bookObj.img_url

    let showTitle = document.createElement('h4')
        showTitle.textContent = bookObj.title
    
    let showSubtitle = document.createElement('h4')
        showSubtitle.textContent = bookObj.subtitle

    let showAuthor = document.createElement('h4')
        showAuthor.textContent = bookObj.author

    let description = document.createElement('p')
        description.textContent = bookObj.description
    
    let showUl = document.createElement('ul')
        showUl.classList.add('show-list')
    
    let usersArr = bookObj.users
    usersArr.forEach(userObj => {
        let userLi = document.createElement('li')
            userLi.textContent = userObj.username
            showUl.append(userLi)
    }) 
    let likeBttn = document.createElement('button')
        likeBttn.dataset.id = bookObj.id
        likeBttn.textContent = "Like"
        likeBttn.addEventListener('click', () => {
            addUser(bookObj)
        })

    showPanel.innerHTML = ''
    showPanel.append(showImg, showTitle, showSubtitle, showAuthor, description, showUl, likeBttn)
}

function addUser(bookObj){
    const users = bookObj.users
        users.push({"id":1, "username":"pouros"})
    
        fetch(`http://localhost:3000/books/${bookObj.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({users})
        })
        .then(res => res.json())
        .then((bookObj) =>{
            showPanel.innerText = ""
            makeShowDiv(bookObj)
        })
}
