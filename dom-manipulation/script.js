const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;


    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  function createAddQuoteForm() {
    const newQuoteForm = document.createElement("div");
    newQuoteForm.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(newQuoteForm);
  }
  
  function addQuote() {
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      showRandomQuote();
    }
  }
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    // Display the quote on the page
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    
    // Save the last viewed quote to sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));  // Save quote to sessionStorage
  }

  function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
      const quote = JSON.parse(lastViewedQuote);  // Parse the JSON string back to an object
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
    }
  }

  // Load the last viewed quote when the page is loaded
loadLastViewedQuote();


  