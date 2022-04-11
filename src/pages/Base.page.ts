import { HTTPResponse } from 'puppeteer';

export default abstract class BasePage {

    protected baseURL: string = 'http://automationpractice.com';
    public page: any;

    protected constructor(page) {
        this.page = page;
    }

    public async loadHomePage(url = this.baseURL): Promise<void> {
        await this.page.goto(url, { waitUntil: 'networkidle0' });
    }
}
