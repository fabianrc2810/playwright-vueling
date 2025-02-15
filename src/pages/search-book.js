export class SearchBookingPage {
  constructor(page) {
    this.page = page;
    this.originInput = this.page.locator('.origin .input-group');
    this.originSearch = this.page.locator('#originInput');
    this.originDropdown = this.page.locator('.vy-list-dropdown_label--strong');
    this.destinationSearch = this.page.locator('#destinationInput');
    this.destinationDropdown = this.page.locator(
      '.vy-list-dropdown_label--strong'
    );
    this.oneWayButton = this.page.locator('.vy-switch_button');
    this.departureMonth = this.page
      .locator('.searchbar-monthpicker_date')
      .nth(4);
    this.searchButton = page.locator('#btnSubmitHomeSearcher');
    this.monthSelector = this.page.locator('.vy-date-tabs-selector_item_date');
    this.showflightsButton = page.locator(
      '#reserve-button-summary-flight-angular'
    );
  }

  async search(
    originSearch,
    originResult,
    destinationSearch,
    destinationResult,
    pickMonth,
  ) {
    await this.originInput.click();
    await this.originSearch.pressSequentially(originSearch);
    await this.originDropdown.filter({ hasText: originResult }).click();
    await this.destinationSearch.pressSequentially(destinationSearch);
    await this.destinationDropdown
      .filter({ hasText: destinationResult })
      .click();
    await this.oneWayButton.click();
    await this.departureMonth.click();
    await this.searchButton.click();
    await this.monthSelector.filter({ hasText: pickMonth }).first().click();
    await this.showflightsButton.click();
  }
}
