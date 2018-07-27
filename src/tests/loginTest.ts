import * as puppeteer from 'puppeteer';
import NavigationMenu from '../pages/NavigationMenu';

describe('Test', () => {

    let browser;
    let page;
    let navMenu;

    before(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        navMenu = new NavigationMenu(page);
    });

    after(async () => {
        // const metrics = await page.metrics();
        // console.log(metrics);
        await browser.close();
    });

    it('Login test', async () => {
        await navMenu.loadNavigationMenu();
        console.log(await navMenu.getNumberOfLinks());
        const loginPage = await navMenu.loadFormAuthenticationPage();
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        const securedPage = await loginPage.submitLoginForm();
        await securedPage.logout();
    });
});
