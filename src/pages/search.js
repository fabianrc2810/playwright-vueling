export class SearchFlightPage {
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
    this.nextButtonCalendar = this.page.locator('#nextButtonCalendar');
    this.monthElement = this.page
      .locator('#id-grid-label span:nth-child(1)')
      .nth(1);

    this.dayElement = this.page.locator('#calendarDaysTable202551');

    this.searchButton = this.page.locator('#btnSubmitHomeSearcher');
  }

  async getDate(month) {
    const MAX_ATTEMPTS = 12;

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const currentMonth = (await this.monthElement.innerText()).trim();

      if (currentMonth === month) {
        return;
      }

      await this.nextButtonCalendar.click();

      await this.page.waitForFunction(
        ([prevMonth]) => {
          const current = document
            .querySelector(
              '#id-grid-label span.ui-datepicker-month:first-child'
            )
            .textContent.trim();
          return current !== prevMonth;
        },
        [currentMonth]
      );
    }

    throw new Error('It was not possible to find the desired month');
  }

  async search(
    originSearch,
    originResult,
    destinationSearch,
    destinationResult,
    pickMonth
  ) {
    await this.originInput.click();
    await this.originSearch.pressSequentially(originSearch);
    await this.originDropdown.filter({ hasText: originResult }).click();
    await this.destinationSearch.pressSequentially(destinationSearch);
    await this.destinationDropdown
      .filter({ hasText: destinationResult })
      .click();
    await this.oneWayButton.click();

    await this.getDate(pickMonth);
    await this.dayElement.click();
    await this.searchButton.click();
  }
}
