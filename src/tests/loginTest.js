import puppeteer from 'puppeteer';
import NavigationMenu from '../pages/NavigationMenu';

describe('Test', function() {

    let browser;
    let page;
    let navMenu;
    
    before(async function() {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        navMenu = new NavigationMenu(page);
    });

    after(async function() {
        // const metrics = await page.metrics();
        // console.log(metrics);
        await browser.close();
    });

    it('Login test', async function() {
        await navMenu.loadNavigationMenu();
        console.log(await navMenu.getNumberOfLinks());
        const loginPage = await navMenu.loadFormAuthenticationPage();
        // console.log(loginPage.getResponse());
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        await loginPage.submitLoginForm();
    });

});
