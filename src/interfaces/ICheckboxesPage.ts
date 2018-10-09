import { ElementHandle } from 'puppeteer';

export default interface ICheckboxesPage {
    checkboxOne() : Promise<ElementHandle>;
    checkboxTwo() : Promise<ElementHandle>;
}
