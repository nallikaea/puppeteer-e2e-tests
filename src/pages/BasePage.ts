const baseSelectors = require('../selectors/basePage.json');
export default class BasePage {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async getPageHeader() : Promise<String> {
        // The header is either an h2 or h3 element.
        try {
            return await this.page.$eval(baseSelectors.level2Header, e => e.textContent.trim());
        } catch (err) {
            return await this.page.$eval(baseSelectors.level3Header, e => e.textContent.trim());
        }
    }

    async getPageSubHeader() : Promise<String> {
        return await this.page.$eval(baseSelectors.pageSubHeaderLocator, e => e.textContent.trim());
    }

    async getFooterText() : Promise<String> {
        return await this.page.$eval(baseSelectors.footerTextLocator, e => e.textContent.trim());
    }

    async getPageMessage() : Promise<String> {
        // return await this.page.$eval(baseSelectors.pageMessageLocator, e => e.innerText.split('\n')[0].trim());
        const selector = baseSelectors.pageMessageLocator;
        return await this.page.$eval(selector, e => e.innerText.replace(/[^a-zA-Z0-9! ]+/g, '').trim());
    }
}
