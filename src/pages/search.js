'use strict';

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

    this.searchButton = this.page.locator('#btnSubmitHomeSearcher');
    // this.monthSelector = this.page.locator('.vy-date-tabs-selector_item_date');
    // this.showflightsButton = this.page.locator(
    //   '#reserve-button-summary-flight-angular'
    // );
  }

  async clickUntilJune() {
    const MAX_ATTEMPTS = 12;

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const currentMonth = (await this.monthElement.innerText()).trim();

      if (currentMonth === 'Junio') {
        return;
      }

      await this.nextButtonCalendar.click();

      // Espera a que el mes cambie
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

    throw new Error('Junio no encontrado después de 12 intentos');
  }

  async search(
    originSearch,
    originResult,
    destinationSearch,
    destinationResult
  ) {
    await this.originInput.click();
    await this.originSearch.pressSequentially(originSearch);
    await this.originDropdown.filter({ hasText: originResult }).click();
    await this.destinationSearch.pressSequentially(destinationSearch);
    await this.destinationDropdown
      .filter({ hasText: destinationResult })
      .click();
    await this.oneWayButton.click();

    await this.clickUntilJune();
    await this.page.bringToFront();

    await this.searchButton.click();
  }
}
