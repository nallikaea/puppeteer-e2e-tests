const baseSelectors = require('../selectors/basePage.json');
export default class BasePage {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async getPageHeader() : Promise<String> {
        // The header is either an h2 or h3 element.
        try {
            return await this.page.$eval(baseSelectors.level2Header, e => e.innerText);
        } catch (err) {
            return await this.page.$eval(baseSelectors.level3Header, e => e.innerText);
        }
    }
}
