import BasePage from './BasePage';
import { ElementHandle } from 'puppeteer';
const selectors = require('../selectors/javascriptAlerts.json');
export default class JavaScriptAlerts extends BasePage {
    private selectors:any;
    constructor(page) {
        super(page);
        this.selectors = selectors;
    }

    get jsAlertButton() : Promise<ElementHandle> {
        return this.page.$(this.selectors.jsAlertButtonLocator);
    }

    get jsConfirmButton() : Promise<ElementHandle> {
        return this.page.$(this.selectors.jsConfirmButtonLocator);
    }

    get result() : Promise<ElementHandle> {
        return this.page.$(this.selectors.resultLocator);
    }

    async clickJSAlertButton() : Promise<void> {
        await this.jsAlertButton.then(e => e.click());
    }

    async clickJSConfirmButton() : Promise<void> {
        await this.jsConfirmButton.then(e => e.click());
    }

    async getResult() : Promise<string> {
        const res = await this.result;
        return this.page.evaluate(e => e.textContent, res);
    }
}
