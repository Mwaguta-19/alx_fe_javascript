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
  

  function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);  // Load the saved quotes into the array
    }
  }
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));  // Save the quotes array as a JSON string
  }

  

// Step 2: Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));  // Save the quotes array as a JSON string
}

// Step 3: Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  
  // Display the quote on the page
  quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
  
  // Save the last viewed quote to sessionStorage
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));  // Store as a JSON string
}

// Step 4: Load the last viewed quote from sessionStorage
function loadLastViewedQuote() {
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    const quote = JSON.parse(lastViewedQuote);  // Parse the stored JSON string back to an object
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>Category: ${quote.category}</em></p>`;
  }
}

// Step 5: Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();  // Save quotes to localStorage
    showRandomQuote();  // Show a new random quote
  }
}

// Step 6: Export quotes to a JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
}

// Step 7: Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);  // Parse the JSON file content
    quotes.push(...importedQuotes);  // Add the imported quotes to the existing array
    saveQuotes();  // Save the updated quotes array to localStorage
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);  // Read the file as text
}

/function setupEventListeners() {
    const newQuoteButton = document.getElementById("newQuote");
    newQuoteButton.onclick = function() {
      showRandomQuote();  // Show a random quote when clicked
    };
    
    const addQuoteButton = document.getElementById("addQuote");
    addQuoteButton.onclick = function() {
      addQuote();  // Add a new quote when clicked
    };
    
    const importFileInput = document.getElementById("importFile");
    importFileInput.onchange = function(event) {
      importFromJsonFile(event);  // Import quotes when a file is selected
    };
  
    const exportButton = document.getElementById("exportButton");
    exportButton.onclick = function() {
      exportToJson();  // Export quotes when clicked
    };
  }
  
  // Initialize the app
  function initializeApp() {
    loadQuotes();  // Load saved quotes from localStorage
    loadLastViewedQuote();  // Load the last viewed quote from sessionStorage
  
    // Optionally show a random quote when the page loads
    if (quotes.length > 0) {
      showRandomQuote();
    }
  
    // Set up the event listeners
    setupEventListeners();
  }
  
  // Call the initializeApp function when the page loads
  initializeApp();