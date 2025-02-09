export class MainPage {
  constructor(page) {
    this.page = page;
    this.rejectButton = this.page.locator('#onetrust-reject-all-handler');
    this.bookLinkAccess = this.page.getByRole('link', { name: 'BOOK NOW' });
  }

  async openVuelingWebPage() {
    await this.page.goto('/');
    //if (await this.rejectButton.isVisible()) {
      await this.rejectButton.click();
    //}
    await this.bookLinkAccess.click();
  }
}
