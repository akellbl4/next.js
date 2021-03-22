/* eslint-env jest */

import { join } from 'path'
import cheerio from 'cheerio'
import {
  stopApp,
  startApp,
  nextBuild,
  nextServer,
  renderViaHTTP,
} from 'next-test-utils'
import webdriver from 'next-webdriver'

jest.setTimeout(1000 * 600)
const appDir = join(__dirname, '../')
let appPort
let server
let app
let html
let $
let browser

describe('Link with prefix slash', () => {
  beforeAll(async () => {
    await nextBuild(appDir)
    app = nextServer({ dir: appDir, dev: false, quiet: true })

    server = await startApp(app)
    appPort = server.address().port
    html = await renderViaHTTP(appPort, '/')
    $ = cheerio.load(html)
    browser = await webdriver(appPort, '/')
  })
  afterAll(() => stopApp(server))

  describe('rendered on server side', () => {
    it('should render href with slash as is', async () => {
      expect($('#slash-link').attr('href')).toBe('/')

      expect(
        await browser.eval(
          'document.querySelector("#slash-link").getAttribute("href")'
        )
      ).toBe('/')
    })

    it('should render empty href as slash', async () => {
      expect($('#empty-link').attr('href')).toBe('/')
      expect(
        await browser.eval(
          'document.querySelector("#empty-link").getAttribute("href")'
        )
      ).toBe('/')
    })

    it('should add prefix slash to href', async () => {
      expect($('#path-without-slash').attr('href')).toBe('/about')
      expect(
        await browser.eval(
          'document.querySelector("#path-without-slash").getAttribute("href")'
        )
      ).toBe('/about')
    })

    it('should render path with prefix slash as is', async () => {
      expect($('#path-with-slash').attr('href')).toBe('/about')
      expect(
        await browser.eval(
          'document.querySelector("#path-with-slash").getAttribute("href")'
        )
      ).toBe('/about')
    })

    it('should render url with origin as is', async () => {
      expect($('#full-url').attr('href')).toBe('http://acme.com/about')
      expect(
        await browser.eval(
          'document.querySelector("#full-url").getAttribute("href")'
        )
      ).toBe('http://acme.com/about')
    })
  })
})
