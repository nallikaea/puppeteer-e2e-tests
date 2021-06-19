import BasePage from './BasePage';
import IBrokenImagesPage from '../interfaces/IBrokenImagesPage';
import { ElementHandle, HTTPResponse } from 'puppeteer';

const selectors = require('../selectors/brokenImages.json');

export default class BrokenImages extends BasePage implements IBrokenImagesPage {
    private brokenImagesSelectors:any;
    constructor(page) {
        super(page);
        this.brokenImagesSelectors = selectors;
    }

    async getImageStatusCode(imageIndex: number): Promise<Number> {
        const images = await this.page.$$(this.brokenImagesSelectors.images);
        const image = images[imageIndex];
        const imageSRCAttribute = await image.getProperty('src');
        const src = await imageSRCAttribute.jsonValue();
        const res = await this.page.goto(src);
        return res.status();
    }
}
