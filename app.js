const currencyNames= [{name :"Australian Dollar",id:"AUD"},{name:"Bulgarian Lev",id:"BGN"},{name:"Brazilian Real",id:"BRL"},
                      {name:"Canadian Dollar",id:"CAD"},{name:"Swiss Franc",id:"CHF"},{name:"Chinese Yuan",id:"CNY"},
                      {name:"Czech Koruna",id:"CZK"},{name:"Danish Krone",id:"DKK"},{name:"Pound Sterling",id:"GBP"},
                      {name:"Hong Kong Dollar",id:"HKD"},{name:"Croatian Kuna",id:"HRK"},{name:"Hungarian Forint",id:"HUF"},
                      {name:"Indonesian Rupiah",id:"IDR"},{name:"Israeli New Shekel",id:"ILS"},{name:"Indian Rupee",id:"INR"},
                      {name:"Icelandic Krona",id:"ISK"},{name:"Japanese Yen",id:"JPY"},{name:"South Korean Won",id:"KRW"},
                      {name:"Mexican Peso",id:"MXN"},{name:"Malaysian Ringgit",id:"MYR"},{name:"Norwegian Krone",id:"NOK"},
                      {name:"New Zealand Dollar",id:"NZD"},{name:"Phillipine Peso",id:"PHP"},{name:"Polish Zloty",id:"PLN"},
                      {name:"Romanian Leu",id:"RON"},{name:"Russian Rubble",id:"RUB"},{name:"Swedish Krona",id:"SEK"},
                      {name:"Singapore Dollar",id:"SGD"},{name:"Thai Baht",id:"THB"},{name:"Turkish Lira",id:"TRY"},
                      {name:"United States Dollar",id:"USD"},{name:"South African Rand",id:"ZAR"}];
                    

displayCurrencyList = (e) => {
  const button = e.target;
  const buttonBox = button.getBoundingClientRect();
  const list = button.nextElementSibling;

  list.style.width=`${buttonBox.width-2}px`;
  list.style.top=`${buttonBox.bottom}px`;

  const html = currencyNames.map(currencyName => 
    `<li>${currencyName.name} (${currencyName.id})</li>`
  ).join('');
  list.innerHTML = html;
  list.classList.toggle('show');

  currencySelect(button,list);
}

currencySelect = (button,list) => {
  const currencyList = list.querySelectorAll('li');
  currencyList.forEach(currency => currency.addEventListener('click', (e) => {
    button.innerHTML = `${currency.innerHTML}`;
    list.classList.toggle('show');
  }));
}

getApiUrl = (e) => {
  const fromCurrencyHtml = convertorArea.querySelector('#fromCurrencyButton').innerHTML;
  const toCurrencyHtml = convertorArea.querySelector('#toCurrencyButton').innerHTML;
  const regex = /[A-Z]{3}/g;
  const fromCurrencyTag = fromCurrencyHtml.match(regex);
  const toCurrencyTag = toCurrencyHtml.match(regex);
  if(fromCurrencyTag === null || toCurrencyTag === null){
    alert('Please Choose the currencies to convert');
  } else {
    const currencyUrl = `https://api.exchangeratesapi.io/latest?symbols=${fromCurrencyTag[0]},${toCurrencyTag[0]}&base=${fromCurrencyTag[0]}`;
    fetch(currencyUrl)
      .then(rawData => rawData.json())
      .then(currencyRate => displayExchangeRate(currencyRate,fromCurrencyTag[0],toCurrencyTag[0]));
  }
}

displayExchangeRate = (currencyValue,fromTag,toTag) => {
  fromInput = document.querySelector('.from-currency-value');
  toInput = document.querySelector('.to-currency-value');
  if(fromInput.value === ''){
    fromInput.value = currencyValue.rates[fromTag];
    toInput.value = currencyValue.rates[toTag];
  } else {
    toInput.value = (fromInput.value * currencyValue.rates[toTag]).toFixed(2);
  }
}

document.addEventListener('click',(e) => {
  if(e.target.classList.contains('currency-button')) {
    displayCurrencyList(e);
  } else{
    document.querySelectorAll('.currency-list').forEach(currencyList => currencyList.classList.remove('show'));
  }
});

const convertButton = document.querySelector('#convert');
convertButton.addEventListener('click',getApiUrl);