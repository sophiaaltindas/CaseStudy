const request = require('supertest');
const index = require('../src/routes/index.js');

const app = require('../src/app.js');

describe('GET /api/v1/auto-complete/:searchString', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/api/v1/auto-complete/München-Allach');
        expect(res.status).toBe(200);
    });
    
    it('should be case insensitive', async () => {
        const res = await request(app).get('/api/v1/auto-complete/müNchen-Allach');
        expect(res.body.station_list).toMatchObject([[8004140, 'MMAL', "München-Allach"]]);
    });
    it('should not allow alphanumeric characters', async () => {
        const res = await request(app).get('/api/v1/auto-complete/München1');
        expect(res.body).toMatchObject({error_code: "001", error_message: "Alphanumeric characters are not allowed"});
    });

    it('should not accept a search string with more than 20 characters', async () => {
        const res = await request(app).get('/api/v1/auto-complete/Name-Is-Here-But-It-Is-Too-Long-For-This-Test-Case-So-It-Will-Not-Work');
        expect(res.body).toMatchObject({error_code: "002", error_message: "Search string must be less than 35 characters"});
    }
    );
    it('should not accept a search string that does not start with an alphabet', async () => {
        const res = await request(app).get('/api/v1/auto-complete/1');
        expect(res.body).toMatchObject({error_code: "003", error_message: "Search string must start with an alphabet"});
    }
    );
    it('should not accept a search string with less than 3 characters', async () => {
        const res = await request(app).get('/api/v1/auto-complete/Mü');
        expect(res.body).toMatchObject({error_code: "004", error_message: "Search string must be at least 3 characters"});
    });


});