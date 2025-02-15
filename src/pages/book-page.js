export class BookingPage {
  constructor(page) {
    this.page = page;
    this.rejectButton = this.page.locator('#onetrust-reject-all-handler');
    this.bookLinkAccess = this.page.getByRole('link', {
      name: 'RESERVAR',
      exact: true,
    });
  }

  async open() {
    await this.page.goto('/');
    await this.rejectButton.click();
    await this.bookLinkAccess.click();
  }
}
