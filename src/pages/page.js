export class MainPage {
  constructor(page) {
    this.page = page;
    this.rejectButton = this.page.locator('#onetrust-reject-all-handler');
    //this.bookLinkAccess = this.page.locator('a:has-text("RESERVAR")');
    this.bookLinkAccess = this.page.getByRole('link', {
      name: 'RESERVAR',
      exact: true,
    });
  }

  async openVuelingWebPage() {
    await this.page.goto('/');
    //if (await this.rejectButton.isVisible()) {
    await this.rejectButton.click();
    //}
    await this.bookLinkAccess.click();
  } 
}
