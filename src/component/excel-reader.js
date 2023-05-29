const Fs = require('fs');
const CsvReadableStream = require('csv-reader');


class ExcelReader {
    inputStream = Fs.createReadStream('D_Bahnhof_2016_01_alle.csv', 'utf8');
    read(inputString) {
        const newList = [];
        const startTime = new Date().getTime();
        return new Promise((resolve, reject) => this.inputStream
            .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: ';' }))
            .on('data', function (row) {
                if (row[2].toUpperCase().includes(inputString.toUpperCase())) {
                    newList.push(row.slice(0, 3))
                }
            })

            .on('end', function () {
                const endTime = new Date().getTime();
                return resolve({ station_list: newList, time_taken: `${endTime - startTime} ms`, number_of_stations_found: newList.length });
            }));
    }
    
}
module.exports = ExcelReader;