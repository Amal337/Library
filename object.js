let library = [
    // {"title": "The Hobbit", "author": "J. R. R.", "pages": "295", "read": "yes" }, 
    // {"title": "Cities of Salt", "author": "Abdulrahman Muneef", "pages": "2500", "read": "yes" },
    // {"title": "Love in the Time of cholera", "author": "Gabreil Garcia Marquez", "pages": "434", "read": "yes" },
    // {"title": "To Kill a Mockingbird", "author": "Harper Lee", "pages": "309", "read": "yes" },
    // {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "pages": "78", "read": "yes" },
    // {"title": "The Wonderful Wizard of Oz", "author": "L. Frank Baum", "pages": "156", "read": "yes" }
];


//book object
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read  
 }


// function to take user’s input and store it
const addBook = (ev) => {
        ev.preventDefault(); //to stop form submitting 
        let book ={
            // id: Date.now(),
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            pages: document.getElementById("pages").value,
            // read: document.getElementById("read").value 
        };
            library.push(book)
            document.querySelector('form').reset(); //to clear the form for another book
            saveToLocalStorage(library);
            render();
    };       
            //function for each book and displays each book on the page
         function render(){
             //get library Books from the local storage 
            library = JSON.parse(localStorage.getItem('MyBooks'));
            if (render.caller !== removeBook) {
            // for each book you make card with the book's details
                library.forEach((item, index) => {
                const shelf = document.querySelector('.library');
            
                const card = document.createElement('div');
                card.className ='book';
                card.setAttribute = ('id', index);
            
                const img = document.createElement('img');/// add image
                card.appendChild(img);
                img.src = "img/img1.jpg";
            
                const title = document.createElement('h4');
                title.innerHTML = item.title;
            
                const author = document.createElement('p');
                author.innerHTML = ' By: ' + item.author;
            
                const pages = document.createElement('p');
                pages.innerHTML = item.pages + 'Pages';
            
                const labelRead = document.createElement('lable');
                labelRead.innerHTML = 'Read?'
                const read = document.createElement('input');
                read.setAttribute('type', 'checkbox');
                //another way to add element to html .. here i am adding remove button 
                // let html=`<button class="removebtn rmBtn" onclick="remove(${title.id})">Remove</button>`;
                // card.innerHTML=html;   
                const removeBtn = document.createElement('button');
                removeBtn.className ='removebtn';
                removeBtn.innerHTML = 'Remove';
                removeBtn.setAttribute = ('id'. index);            
                removeBtn.addEventListener('click', removeBook);
            
                    
            
                shelf.appendChild(card);
                card.appendChild(title);
                card.appendChild(author);
                card.appendChild(pages);
                card.appendChild(labelRead);
                labelRead.appendChild(read);
                card.appendChild(removeBtn);
            
            })
        }
    };
            
            render()

        // remove book
function removeBook(e) {
     let buttonId = e.target.getAttribute("id");
     let cardToRemove = document.getElementById(`${buttonId}`);
     cardToRemove.remove();
     library.splice(buttonId, 1);
     saveToLocalStorage(library);
        render();
        };

//save library to localStorage 
function saveToLocalStorage(library){
    localStorage.setItem('MyBooks', JSON.stringify(library)); //save to local storage
}
    
        
//open or close (add book) form 
function openForm() {
    document.getElementById("myForm").style.display = "block";
};
        
function closeForm() {
     document.getElementById("myForm").style.display = "none";
}; 
document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('add').addEventListener('click', addBook); 
        });     
