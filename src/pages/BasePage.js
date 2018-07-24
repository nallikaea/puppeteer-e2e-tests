export default class BasePage {

    constructor(page, response) {
        this.page = page;
        this.response = response;
    }

    async getPageHeader() {
        // The header is either an h2 or h3 element.
        const h2Selector = 'document.querySelector("div.example h2");';
        const h3Selector = 'document.querySelector("div.example h3");';
        try {
            return await page.evaluate(h2Selector).textContent;
        } catch (err) {
            // assume h2 is not the page header
            return await page.evaluate(h3Selector).textContent;
        }
    }

    getResponse() {
        return this.response;
    }
}
