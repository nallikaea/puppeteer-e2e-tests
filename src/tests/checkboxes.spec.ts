import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';
import Checkboxes from '../pages/Checkboxes';

describe('Checkboxes test:', () => {
    let browser;
    let page;
    let navMenu;
    let checkboxes;
    let checkbox1;
    let checkbox2;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        navMenu = new NavigationMenu(page);
    });

    beforeEach(async () => {
        checkboxes = await navMenu.loadCheckboxesPage();
        checkbox1 = await checkboxes.checkboxOne();
        checkbox2 = await checkboxes.checkboxTwo();
    });

    after(async () => {
        await browser.close();
    });

    it('Default state test', async () => {
        expect(await checkboxes.getPageHeader()).to.equal('Checkboxes');
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.false;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.true;
    });

    it('Reverse default state', async () => {
        await checkbox1.click();
        await checkbox2.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.true;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.false;
    });

    it('Both boxes checked', async () => {
        await checkbox1.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.true;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.true;
    });

    it('Checkbox 2 test ', async () => {
        await checkbox2.click();
        expect(await page.evaluate(e => e.checked, checkbox1)).to.be.false;
        expect(await page.evaluate(e => e.checked, checkbox2)).to.be.false;
    });
});
