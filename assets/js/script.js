// html variables
var searchInputEl = $("#searchInput");
var searchFormEl = $("#searchForm");
var coinDataContainer = $("#coinDataContainer");
var searchHistoryEl = $("#previousSearches");
var coinPriceEl = $("#coinPrice");
var searchHistoryContainer = $("#searcHistoryContainer");
var tweetContainer = $("#tweetContainer");
var newsContainer = $("#newsContainer");

//search function
function searchInput(event) { // use the submit event
    event.preventDefault()
    coinsListapi(searchInputEl.val()) // insert search input in coinsListapi function
}
// coingecko coin list api
function coinsListapi(coinName) { // ref line 19
    fetch(`https://api.coingecko.com/api/v3/coins/${coinName}?market_data=true`) // fecth url with dynamic endpoint
        .then(function (response) {
            response.json()
                .then(function (data) {
                    coinName = data.name; // ex: {"name: 'Bitcoin'"} the name
                    coinId = data.id; // ex: {"id: 'bitcoin'"} the ID, this one matters because if lowercase, the fetch url below will not accept it as a parameter. 
                    coinIcon = data.image.small; // ex: {"image: 'small'"} the icon
                    coinSymbol = data.symbol; // ex: {"symbol: 'btc'"} this is the coin's ticker
                    coinDescription = data.description.en; // ex {"description: en: (some text)"} the description
                    coinHomepage = data.links.homepage[0]; // homepage link
                    coinlink1 = data.links.blockchain_site[0]; // blockchain site
                    coinlink2 = data.links.official_forum_url[0]; // forum site
                    coinlink3 = data.links.subreddit_url; // subreddit

                    // setting parameters for the following functions
                    displayCurrentData(coinName, coinIcon, coinSymbol, coinDescription, coinHomepage, coinlink1, coinlink2, coinlink3);
                    PriceData(coinId);
                    coinPaprikaTweetApi(coinSymbol, coinId);
                    coinPaprikaEventsApi(coinSymbol, coinId);
                })
        });

    return;
}

// fetching price data from coingecko coin market api
function PriceData(coinId) { // ref coinsListapi
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`) // fetch the url with dynamic parameter
        .then(function (response) {
            response.json()
                .then(function (data) {
                    coinPrice = data[0].current_price;
                    coinName = data.name;
                    // set new parameters with current parameters
                    displayCurrentData(coinName, coinIcon, coinSymbol, data[0].current_price, coinDescription, coinHomepage, coinlink1, coinlink2, coinlink3);
                });
        });

    return;
}

function displayCurrentData(coinName, coinIcon, coinSymbol, coinPrice, coinDescription, coinHomepage, coinlink1, coinlink2, coinlink3) { // ref coinsListapi
    $("#coinDataContainer").attr("class", "card cr col s5 hoverable");// coin data container in html file
    $("#coinName").html(coinName);// coin name
    $("#coinSymbol").html(coinSymbol); // coin symbol
    $("#coinHomepage").attr("href", `${coinHomepage}`) // link to homepage
    $("#coinHomepage").attr("class", "btn-floating btn-large pulse"); // icon pulse
    $("#icon").attr("src", `${coinIcon}`); //icon
    $("#description").html(coinDescription); //description
    $("#link1").attr("href", `${coinlink1}`); // link to blockchain site
    $("#link2").attr("href", `${coinlink2}`); // link to coin forum site
    $("#link3").attr("href", `${coinlink3}`); // link to subreddit

    // number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    var coinPriceDisp = formatter.format(coinPrice); // display coin price in currency format

    $("#coinPrice").html(coinPriceDisp);// coin price
}

// coinpaprika api for capturing twitter data
function coinPaprikaTweetApi(coinSymbol, coinId) { // ref coinsListapi
    fetch(`https://api.coinpaprika.com/v1/coins/${coinSymbol}-${coinId}/twitter`) // fetch url with dynamic parameters define in coinlistapi function
        .then(function (response) {
            response.json()
                .then(function (data) {
                    tweets = data; // define data as tweets
                    // set parameter for future api request function
                    coinPaprikaEventsApi(coinSymbol, coinId);
                    // set parameter as data captured in this fetch request to be displayed in html file
                    displayTweets(tweets);
                });
        });

    return;
}

// displays tweets to page dynamically
function displayTweets(tweets) { // ref coinpaprikaTweetApi
    tweetContainer.html(`<h3>Recent Tweets</h3>`); // section title
    for (var i = 1; i <= 5; i++) { // for loop through data ie 'tweets'
        // template string to dynamically create elements with data pulled from coinpaprika twitter api
        var divEl1 = $(`
        <div class="col s12 m6"
        <div class="card-content">
        <div class="twitterCard card horizontal">
        <div class="card-image">
        <img src="${tweets[i].user_image_link}">
        </div>
        <div class="card-stacked">
        <h4> @${tweets[i].user_name}</h4>
        <p>"${tweets[i].status}" <a href="${tweets[i].status_link}">&nbsp via Twitter</a></p>
        </div>
        </div>
        </div>
        </div>`)
        divEl1.appendTo(tweetContainer) // place inside container already created in html file
    }
}

// coinpaprikaapi for current events relating to crypto currency
function coinPaprikaEventsApi(coinSymbol, coinId) { // ref coinpaprikaTweetApi
    fetch(`https://api.coinpaprika.com/v1/coins/${coinSymbol}-${coinId}/events`) // fet the url
        .then(function (response) {
            response.json()
                .then(function (data) {
                    news = data; // defines data as "news"
                    displayEvents(data); // sets parameter for function to display current events
                });
        });


}

// displays current event new articles dynamically on page
function displayEvents(news) { // ref coinPaprikaEventsApi
    newsContainer.html(`<h3>Crypto News</h3>`); // section title
    for (var i = 1; i <= 2; i++) { // loop through captured data
        // created a template string to created elements dynamically based on data captured in previous fetch request function
        var divEl2 = $(`
        <div class="col s12 m4">
        <div class="card-content">
        <div class="newsCard card">
        <img src="${news[i].proof_image_link}" class="responsive-img">
        <h4>${news[i].name}</h4>
        <p id="newsDescription" class="">${news[i].description}<a href="${news[i].link}"> Read more...</a></p>
        </div>
        </div>
        </div>`)
        divEl2.appendTo(newsContainer) // attach string inside container that already exists in the html file
    }
}


function start() { // lets get this shit started frfr
    searchFormEl.submit(searchInput)
}

start() // yeet