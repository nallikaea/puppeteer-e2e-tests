import * as puppeteer from 'puppeteer';
import { expect } from 'chai';
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
        await browser.close();
    });

    it('Login test', async () => {
        await navMenu.loadNavigationMenu();
        console.log(await navMenu.getNumberOfLinks());
        const loginPage = await navMenu.loadFormAuthenticationPage();
        expect(await loginPage.getPageHeader()).to.equal('Login Page');
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        const securedPage = await loginPage.submitLoginForm();
        await securedPage.logout();
    });
});
