var searchInputEl = $("#searchInput");
var searchFormEl = $("#searchForm");
var coinDataContainer = $("#coinContainer");
var searchHistoryEl = $("#previousSearches");
var coinPriceEl = $("#coinPrice");
var searchHistoryContainer = $("#searcHistoryContainer")
// var search = searchInputEl.val();

//search function
function searchInput(event) { // use the submit event
    event.preventDefault()
    coinsListapi(searchInputEl.val()) // insert search input in coinsListapi function
}

function coinsListapi(coinName) { // ref line 19
    fetch(`https://api.coingecko.com/api/v3/coins/${coinName}?market_data=true`) // fecth url with dynamic endpoint
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                    coinName = data.name; // ex: {"name: 'Bitcoin'"} the name
                    coinId = data.id; // ex: {"id: 'bitcoin'"} the ID, this one matters because if lowercase, the fetch url below will not accept it as a parameter. 
                    coinIcon = data.image.small; // ex: {"image: 'small'"} the icon
                    coinSymbol = data.symbol; // ex: {"symbol: 'btc'"} this is the coin's ticker
                    coinDescription = data.description.en; // ex {"description: en: (some text)"} the description
                    console.log(coinPrice);
                    // setting parameters for the following functions
                    displayCurrentData(coinName, coinIcon, coinSymbol, coinDescription);
                    PriceData(coinId);
                })
        });

    return;
}

function PriceData(coinId) {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                    coinPrice = data[0].current_price;
                    coinName = data.name;
                    console.log(coinPrice);
                    displayCurrentData(coinName, coinIcon, coinSymbol, data[0].current_price, coinDescription)
                })
        })
}
function displayCurrentData(coinName, coinIcon, coinSymbol, coinPrice, coinDescription) {
    $("#coinName").html(coinName);// coin name
    $("#coinSymbol").html(coinSymbol); // coin symbol
    $("#icon").attr("src", `${coinIcon}`); //icon
    $("#description").html(coinDescription); //description

    // number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    var coinPriceDisp = formatter.format(coinPrice); // display coin price in currency format

    $("#coinPrice").html(coinPriceDisp);// coin price
}

function start() {
    searchFormEl.submit(searchInput)
}

start()