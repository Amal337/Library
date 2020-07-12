let myLibrary = [];

//the constructor
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read  
    this.info = function(){
        return (`${this.title} By ${this.author}, ${this.pages} pages. ${this.read}`)
    }
}

// function to take user’s input 
//and store the new book objects into an array
function addBookToLibrary(){

}

//function to loop through array 
//and displays each book on the page
function render(){

}

//function that toggles a book’s read 
//status on your Book prototype instance. 
function toggleRead(){

}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
console.log(theHobbit.info());

