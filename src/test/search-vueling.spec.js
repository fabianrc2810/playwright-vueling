"use strict";

import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page';
import { SearchFlightPage } from '../pages/search';
import { SchedulePage } from '../pages/schedule';

import searchData from '../data/searchData.json' assert { type: 'json' };

const data = JSON.parse(JSON.stringify(searchData));

test.describe('Vueling flight search', () => {
  let page;
  let vuelingHomePage;
  let searchFlight;
  let schedulePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    vuelingHomePage = new MainPage(page);
    searchFlight = new SearchFlightPage(page);
    schedulePage = new SchedulePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should find flights from Madrid to Barcelona on June 1st', async () => {
    await vuelingHomePage.openVuelingWebPage();
    await searchFlight.search(
      data.originSearch,
      data.originResult,
      data.destinationSearch,
      data.destinationResult
    );

    const flightsAvailable = await schedulePage.checkFlights();
    expect(flightsAvailable).toBeGreaterThan(1);
  });
});
