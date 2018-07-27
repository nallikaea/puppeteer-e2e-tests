export default class BasePage {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async getPageHeader() : Promise<String> {
        // The header is either an h2 or h3 element.
        const h2Selector = 'document.querySelector("div.example h2");';
        const h3Selector = 'document.querySelector("div.example h3");';
        try {
            return await this.page.evaluate(h2Selector).textContent;
        } catch (err) {
            // assume h2 is not the page header
            return await this.page.evaluate(h3Selector).textContent;
        }
    }
}
