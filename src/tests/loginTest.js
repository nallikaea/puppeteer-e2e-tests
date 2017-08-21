import puppeteer from 'puppeteer';
import Login from '../pages/Login';

describe('Test', function() {

    let browser;
    let page;
    let loginPage;
    
    before(async function() {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        loginPage = new Login(page);
    });

    after(async function() {
        await browser.close();
    });

    it('Login test', async function() {
        await loginPage.gotoPage();
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        await loginPage.submitLoginForm();
    });

});

