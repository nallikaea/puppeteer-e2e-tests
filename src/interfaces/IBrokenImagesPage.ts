import { ElementHandle, HTTPResponse } from 'puppeteer';

export default interface IBrokenImagesPage {
    getImageStatusCode(imageElement: number): Promise<Number>;
}
