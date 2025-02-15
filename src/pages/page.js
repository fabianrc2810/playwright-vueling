export class MainPage {
  constructor(page) {
    this.page = page;
    this.modalCookies = this.page.locator('#onetrust-banner-sdk ');
    this.rejectButton = this.page.locator('#onetrust-reject-all-handler');
  }

  async openVuelingWebPage() {
    await this.page.goto('/');

    if (await this.modalCookies.isVisible()) {
      await this.rejectButton.click();
    }
  }
}
