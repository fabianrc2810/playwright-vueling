'use strict';

import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page';
import { SearchFlightPage } from '../pages/search';
import { SchedulePage } from '../pages/schedule';

import { SearchBookingPage } from '../pages/search-book';
import { BookingPage } from '../pages/book-page';

import searchData from '../data/searchData.json' assert { type: 'json' };
const data = JSON.parse(JSON.stringify(searchData));

test.describe('Vueling flight search', () => {
  let page;
  let bookingPage;
  let vuelingHomePage;
  let searchFlight;
  let searchBookingPage;
  let schedulePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.route('**://hotel.vueling.com/**', (route) => route.abort());

    vuelingHomePage = new MainPage(page);
    bookingPage = new BookingPage(page);
    searchFlight = new SearchFlightPage(page);
    searchBookingPage = new SearchBookingPage(page);
    schedulePage = new SchedulePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should find flights from Madrid to Barcelona on June 1st', async () => {
    await vuelingHomePage.openVuelingWebPage();
    const [ticketsPage] = await Promise.all([
      page.waitForEvent('popup'),
      searchFlight.search(
        data.originSearch,
        data.originResult,
        data.destinationSearch,
        data.destinationResult
      ),
    ]);

    await ticketsPage.waitForLoadState();
    const ticketsSchedulePage = new SchedulePage(ticketsPage);

    const flightsAvailable = await ticketsSchedulePage.checkFlights();
    expect(flightsAvailable).toBeGreaterThan(0);
  });

  test('should navigate to booking page and find flights from Madrid to Barcelona on June 1st', async () => {
    await bookingPage.openVuelingWebPage();
    await searchBookingPage.search(
      data.originSearch,
      data.originResult,
      data.destinationSearch,
      data.destinationResult
    );

    const flightsAvailable = await schedulePage.checkFlights();
    expect(flightsAvailable).toBeGreaterThan(0);
  });
});
