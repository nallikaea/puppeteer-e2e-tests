import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';
import Checkboxes from '../pages/Checkboxes';

describe('Checkboxes test:', () => {
    let browser;
    let page;
    let navMenu;
    let checkboxes;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        navMenu = new NavigationMenu(page);
    });

    beforeEach(async () => {
        await navMenu.loadNavigationMenu();
        checkboxes = await navMenu.loadCheckboxesPage();
    });

    after(async () => {
        await browser.close();
    });

    it('Toggle Checkboxes test', async () => {
        expect(await checkboxes.getPageHeader()).to.equal('Checkboxes');
        const checkbox1 = await checkboxes.checkboxOne();
        const checkbox2 = await checkboxes.checkboxTwo();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.false;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.true;
        await checkbox1.click();
        await checkbox2.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.true;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.false;
    });

    it('Checkbox 1 test ', async () => {
        // Checkbox 1 is not selected by default
        const checkbox1 = await checkboxes.checkboxOne();
        const checkbox2 = await checkboxes.checkboxTwo();
        await checkbox1.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.true;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.true;
    });

    it('Checkbox 2 test ', async () => {
        // Checkbox 2 is selected by default
        const checkbox1 = await checkboxes.checkboxOne();
        const checkbox2 = await checkboxes.checkboxTwo();
        await checkbox2.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.false;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.false;
    });
});
