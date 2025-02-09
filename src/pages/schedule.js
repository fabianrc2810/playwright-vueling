export class SchedulePage {
  constructor(page) {
    this.page = page;
    this.flightList = this.page.locator(
      '#outboundFlightCardsContainer #flightCardsContainer'
    );
  }

  async checkFlights() {
    const flightCards = await this.flightList.locator(
      '[data-js-id="flightCard"]'
    );
    await this.flightList.first().click();
    const count = await flightCards.count();

    return count;
  }
}
