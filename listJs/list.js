  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC5ZDEN1O5RfsKCuzLU7nI8KlSuSUVZrtM",
    authDomain: "book-library-acfbc.firebaseapp.com",
    projectId: "book-library-acfbc",
    storageBucket: "book-library-acfbc.appspot.com",
    messagingSenderId: "836573870431",
    appId: "1:836573870431:web:89a3f77507062a1f4a5eea",
    measurementId: "G-GKVFC0N92H"
  };
  const app = initializeApp(firebaseConfig);
  const ana = getAnalytics(app);
  const database = firebase.database();
// Reference to the books collection
const booksRef = database.ref('books');
// Add book to the database
document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    if (title && author) {
        const newBookRef = booksRef.push();
        newBookRef.set({
            title: title,
            author: author
        });

        // Clear the form
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
    }
});

// Display books from the database
booksRef.on('value', function (snapshot) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    snapshot.forEach(function (childSnapshot) {
        const bookData = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = `${bookData.title} by ${bookData.author}`;
        bookList.appendChild(li);
    });
});