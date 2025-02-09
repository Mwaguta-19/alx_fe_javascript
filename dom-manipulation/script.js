// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" },
];

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
}

// Call this function to show a random quote on page load
showRandomQuote();

// Attach event listener to the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to create the Add Quote Form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create the text input for the quote
  const quoteTextInput = document.createElement('input');
  quoteTextInput.setAttribute('id', 'newQuoteText');
  quoteTextInput.setAttribute('type', 'text');
  quoteTextInput.setAttribute('placeholder', 'Enter a new quote');

  // Create the input for the quote category
  const categoryInput = document.createElement('input');
  categoryInput.setAttribute('id', 'newQuoteCategory');
  categoryInput.setAttribute('type', 'text');
  categoryInput.setAttribute('placeholder', 'Enter quote category');

  // Create the button to add the quote
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';

  // Append the input fields and button to the form container
  formContainer.appendChild(quoteTextInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Add the form to the DOM, below the "Show New Quote" button
  document.body.appendChild(formContainer);

  // Add an event listener for the Add Quote button
  addButton.addEventListener('click', addQuote);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Validate the inputs
  if (newQuoteText && newQuoteCategory ) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);  // Add the new quote to the array
    saveQuotes();  // Save the updated quotes to localStorage
    showRandomQuote();
  }
}
  function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);  // Convert the quotes array to a JSON string
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';  // Name of the file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);  // Add imported quotes to the existing quotes array
      saveQuotes();  // Save the updated quotes to localStorage
      alert('Quotes imported successfully!');
      showRandomQuote();  // Optionally display a quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

const exportButton = document.createElement('button');
exportButton.textContent = 'Export Quotes';
exportButton.onclick = exportToJson;
document.body.appendChild(exportButton);

const importButton = document.createElement('input');
importButton.type = 'file';
importButton.accept = '.json';
importButton.onchange = importFromJsonFile;
document.body.appendChild(importButton);
  