# Baby's First CryptoCurrency Tracker
The tracker for the beginner investor who's for a way to get into the world of CryptoCurrency. Customize which currencies you want to track in your own personal account, add and update your investments, and watch as the currencies update in real time. 

## Wireframes
Initial concepts for what each page in the app will look like.

![Wireframes](https://i.imgur.com/GlllzzE.jpg)

## MVP Features
Basic features for the app.

1. Create and store users
2. Let users choose which currencies they want to track and store their choices
3. Take data from the Coin Market Cap API and render it on the site

## Post-MVP Features
Additional features I'd like to impliment. 

4. Users can track their own investments
5. Page that tracks the top X currencies
6. Add more info to each currency for the tracker
7. Users can delete their accounts

## Priority Matrix
Time/Priority Matrix for all my MVP and Post-MVP features

![Stuffs](https://i.imgur.com/Ng84dtR.jpg)

## Timeframes
Tracking how long it'll take for me to complete my various features.

| Componant                                     | Priority | Estimated Time | Actual Time |
------------------------------------------------|----------|----------------|-------------|
| Create all the views                          | H        | 2H             | 6H          |
| Store currencies added by users               | H        | 4H             | 10H         |
| Show current value of stored currencies       | H        | 8H             | 8H          |
| Individual user accounts to track investments | M        | 8H             | 6H          |
| Style the app                                 | M        | 10H            | 6H          |
| Page that tracks the top X currencies         | L        | 4H             | 1.5H        |
| Delete user accounts                          | L        | 3H             | 0H          |

## Technologies Used: 

* Node.js: Build the application
* Express: Build the API
* PostgreS: Store data in a local database
* EJS: View engine, used to convert the embedded JavaScript into HTML
* Axios: Grab data from an external API
* Body-Parser: Parses JSON objects
* Method-Override: Allows the client to make requests besides GET and POST
* PG-Promise: Manipulate data from SQL files
* Morgan: Logger
* Passport: Authentication
* Express-session: Save the session when the client switches pages so they don't have to constantly log in and out

### Languages:

* HTML: Framework for the site
* CSS: Styling the HTML elements
* JavaScript: Building the back-end for the app
* PostgreSQL: Accessing the PostgreS database

## Code Snippet: 
![Code](https://i.imgur.com/Uw7w2PM.png)
This piece of code is what renders the individual currency page for each user's unique investment. First it uses a model method to grab the specific currency the user is tracking. It then makes an axios call to the coinmarketcap API where it grabs all the available data they have available. Then, if there's an investment ID connected to the currency it finds the investment in a separate table to display the invested amount on the page. 

## Features Planned but not Implemented:

1. Investment calculator that would calculate the total value of the user's investments in real time. 
2. Allow users to delete their own accounts.
3. Logout feature.

## Known Issues:

* SQL Doesn't accept decimals
* Users need to enter an investment amount, should be optional. Current fix is to have the placeholder value be 0.

## User Stories: 
* As a crypto investor I want an app that tracks the value of currencies I've invested in or plan on investing in. 
* As a potential investor in cryptocurrencies I want an app that can show me the relevant information I need on currencies to make a decision.
* As someone who knows little or nothing about cryptocurrencies I want an app that can show me details about a currency's value in a way I can understand. 

## Download and Run on LocalHost:

1. Fork the repository to your own Github account (or similar).
2. Clone the forked repository to your computer.
3. Import the dependencies listed in the package.json file.
4. Create a database in PostgreS for local storage (ex. crypto_tracker).
5. Connect the SQL files in the migrations folder to the database. In the terminal run PSQL -d crypto_tracker -f db/migrations/migration.sql for each migration file. There should be 3 total.
6. If you have Nodemon installed, write in the command line "npm run dev", otherwise write "npm start" or "node app.js".

If you have any issues with the above steps, I dun goofed sorry.
