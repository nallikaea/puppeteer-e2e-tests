import BasePage from './BasePage';
import { ElementHandle } from 'puppeteer';

const selectors = require('../selectors/keyPresses.json');

export default class KeyPresses extends BasePage {
    private selectors:any;
    constructor(page) {
        super(page);
        this.selectors = selectors;
    }

    get result() : Promise<ElementHandle> {
        return this.page.$(this.selectors.result);
    }

    async getResultText() : Promise<string> {
        const res = await this.result;
        return this.page.evaluate(e => e.textContent, res);
    }

    async pressKey(keyboardKey) : Promise<void> {
        await this.page.keyboard.press(keyboardKey);
    }
}
