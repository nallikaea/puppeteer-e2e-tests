import { ElementHandle } from 'puppeteer';

export default interface IBasePage {
    getPageHeader() : Promise<String>;
}
