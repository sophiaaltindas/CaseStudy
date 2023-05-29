# Station Autocomplete Web Service

This project is a web service that provides autocomplete functionality for station names. Given a search query consisting of at least three characters, the web service returns an autocomplete list of stations based on the provided CSV file. The response will be in JSON format and include the station information in the format: "EVA_NR – DS100 - Name".

## API Endpoint

The web service exposes the following REST API endpoint:

`GET /api/v1/auto-complete/{query}`

The {query} represents the path parameter, which should consist of at least three characters. For example, to search for stations containing "FRA", the request URL would be:

`GET /api/v1/auto-complete/FRA`

JSON Response
The expected JSON response for the API request is as follows:
```json
{
  "station_list": [
    "8098105 - FFT - Frankfurt Hbf (tief)",
    "8070003 - FFLF - Frankfurt(M) Flughafen Fernbf",
    "8070004 - FFLU - Frankfurt(M) Flughafen Regionalbf"
  ],
  "time_taken": "0.2 ms",
  "number_of_stations_found": "3"
}
```
The station_list field contains an array of stations that match the search query. It may contain more than three stations. Each station entry is formatted as "EVA_NR – DS100 - Name".

The time_taken field represents the time difference in milliseconds between receiving the HTTP request and sending the HTTP response.

The number_of_stations_found field indicates the total number of stations found that are included in the station_list.

Please note that the CSV file contains the complete dataset of stations used for the autocomplete functionality.

## Installation and Setup

To get started with the project, perform the following steps:

Clone the repository by running the following command:

```bash
git clone https://github.com/sophiaaltindas/CaseStudy.git
```

Navigate to the project directory:

```bash
cd CaseStudy
```

Install the required dependencies by running the following command:

```bash
npm install
```
This will install the necessary packages, including Node.js dependencies specified in the package.json file.

Once the dependencies are installed, start the web service by running the following command:

```bash
npm start
```
This will launch the server and make the autocomplete functionality available through the defined API endpoint.

## Testing

The code includes one test file that utilize Jest and Supertest for testing purposes. The tests ensure the correct functioning of the web service and the accuracy of the autocomplete feature. The test file is:

`router.test.js`: This file includes tests for the REST API endpoint, ensuring that the endpoint is accessible, returns the expected response, and handles different scenarios.

To run the tests, execute the following command:

``` bash
npm run test
```