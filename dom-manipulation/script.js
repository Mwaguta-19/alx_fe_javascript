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

  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quotes.json";
    link.click();
  }
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
    