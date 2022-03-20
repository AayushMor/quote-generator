const quoteContainer=document.querySelector('#quote-container');
const quoteText=document.querySelector('#quote');
const authorText=document.querySelector('#author');
const twitterBtn=document.querySelector('#twitter');
const newQuoteBtn=document.querySelector('#new-quote');
const loader=document.querySelector('#loader');


let apiQuotes=[];

// Show Loading
   function loading(){
       loader.hidden=false;
       quoteContainer.hidden=true;
   }

   // Hide Loading
   function complete(){
       quoteContainer.hidden=false;
       loader.hidden=true;
   }
// Show new Quote
function newQuote(){
    loading();
    //Pick a random quote from api quotes
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)]

    //Check if author field is blank and fill it with 'Unknown'
    if(!quote.author){
        authorText.textContent="Unknown";
    }else{
        authorText.textContent=quote.author;
    }

    //Check quote length to determine styling
if(quote.text.length>120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
//Set quote,hide Loader
    quoteText.textContent=quote.text;
    complete();
}

// Get Quotes from API

async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    }catch(error){
        //Catch Error Here
    }
}

//To tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load
 getQuotes();
