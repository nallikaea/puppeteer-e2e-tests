import { ElementHandle } from 'puppeteer';

export default interface IHoversPage {
    hoverOverImage(position) : Promise<void>;
    returnToHoversPage() : Promise<void>;
    clickViewProfile(position) : Promise<void>;
    getUserName(position) : Promise<string>;
}
