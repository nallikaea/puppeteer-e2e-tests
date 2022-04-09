export default interface IBrokenImagesPage {
    getImageStatusCode(imageElement: number): Promise<Number>;
}
