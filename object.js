let library = [];

//book object
function Book(title, author, pages){
    this.title = title
    this.author = author
    this.pages = pages  
 };

 // function to take user’s input and store it
const addBook = (ev) => {
    ev.preventDefault(); //to stop form submitting 
    const title = document.querySelector('#title').value
    const pages = document.querySelector('#pages').value
    const author = document.querySelector('#author').value
   
    let newBook = new Book(title, author, pages);
    library.push(newBook);

    localforage.setItem('bookLibrary', library).then(bookLibrary => {
        //we can repaint the DOM again, inside here
        //becaue here we have the updated db.
        let lastBookIndex = bookLibrary.length - 1;
        renderBook(bookLibrary[lastBookIndex], lastBookIndex);
    }).catch()

    document.querySelector('form').reset(); //to clear the form for another book

};

 function renderBook(item, index) {

    const shelf = document.querySelector('.library');

    const card = document.createElement('div');
    card.className = 'book';
    card.setAttribute("id", index);

    const img = document.createElement('img');/// add image
    card.appendChild(img);
    img.src = "img/img1.jpg";

    const title = document.createElement('h4');
    title.innerHTML = item.title;

    const author = document.createElement('p');
    author.innerHTML = ' By: ' + item.author;

    const pages = document.createElement('p');
    pages.innerHTML = item.pages + 'Pages';

    const labelRead = document.createElement('label');
    labelRead.innerHTML = 'Read?'
    const read = document.createElement('input');
    read.setAttribute('type', 'checkbox');
    //another way to add element to html .. here i am adding remove button 
    // let html=`<button class="removebtn rmBtn" onclick="remove(${title.id})">Remove</button>`;
    // card.innerHTML=html;   
    const removeBtn = document.createElement('button');
    removeBtn.className = 'removebtn';
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute("id", index);
    removeBtn.addEventListener('click', removeBook);



    shelf.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(labelRead);
    labelRead.appendChild(read);
    card.appendChild(removeBtn);
};

function renderAll() {
    localforage.getItem('bookLibrary').then(bookLibrary => {
        //we can repaint the DOM again, inside here
        //becaue here we have the updated db.
        bookLibrary.forEach(renderBook);

        /* when we load the page we need to assign already existing stored values to the
           library array in order to get proper indexes when we are adding a new book in the next steps on our page
        */
        library = bookLibrary;
    })
};


// remove book
function removeBook(e) {
    let buttonId = e.target.getAttribute("id");
    let cardToRemove = document.getElementById(`${buttonId}`);
    cardToRemove.remove();
    library.splice(buttonId, 1);
    localforage.getItem("bookLibrary", library);
       };

//open or close (add book) form 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
        
function closeForm(e) {
     e.preventDefault();
     document.getElementById("myForm").style.display = "none";
} 

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('add').addEventListener('click', addBook);
        
            // to be able to pass event as argument and stop automatically submitting after we click the close button so the books stay on page because the page doesn't refresh
            document.querySelector("#close").addEventListener("click", closeForm)
        });

// for rendering all books that are in storage once the page is loaded
renderAll();


