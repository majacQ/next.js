/* eslint-env jest */
import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

describe('setting cookies', () => {
  const { next, isNextDeploy, skipped } = nextTestSetup({
    files: __dirname,
  })

  if (skipped) return

  let currentCliOutputIndex = 0
  beforeEach(() => {
    resetCliOutput()
  })

  const getCliOutput = () => {
    if (next.cliOutput.length < currentCliOutputIndex) {
      // cliOutput shrank since we started the test, so something (like a `sandbox`) reset the logs
      currentCliOutputIndex = 0
    }
    return next.cliOutput.slice(currentCliOutputIndex)
  }

  const resetCliOutput = () => {
    currentCliOutputIndex = next.cliOutput.length
  }

  const EXPECTED_ERROR =
    /Cookies can only be modified in a Server Action or Route Handler\./

  const EXPECTED_ERROR_IN_AFTER =
    /An error occurred in a function passed to `unstable_after\(\)`: .+?: Cookies can only be modified in a Server Action or Route Handler\./

  describe('stops cookie mutations when changing phases', () => {
    it('from an action to a page render', async () => {
      const path = '/cookies/action-to-render'
      const session = await next.browser(path)

      const timestamp1 = await session.elementById('timestamp').text()
      // .set() should throw during render
      expect(await session.elementById('canSetCookies').text()).toEqual('false')
      if (!isNextDeploy) {
        expect(getCliOutput()).toMatch(EXPECTED_ERROR)
      }
      // no cookie should be set
      expect(await session.eval('document.cookie')).not.toInclude(
        'illegalCookie'
      )

      resetCliOutput()
      // trigger an action
      await session.elementByCss('[type="submit"]').click()
      // wait for page to update as a result
      await retry(async () => {
        const timestamp2 = await session.elementById('timestamp').text()
        expect(timestamp2).not.toEqual(timestamp1)
      })

      // .set() should throw during render
      expect(await session.elementById('canSetCookies').text()).toEqual('false')
      if (!isNextDeploy) {
        expect(getCliOutput()).toMatch(EXPECTED_ERROR)
      }

      // no cookie should be set
      expect(await session.eval('document.cookie')).not.toInclude(
        'illegalCookie'
      )
    })

    // these tests inspect CLI logs to see what happened in unstable_after,
    // so they won't work in deploy mode
    if (!isNextDeploy) {
      it.each([
        {
          title: 'from an action to unstable_after',
          path: '/cookies/action-to-after',
        },
        {
          title: 'from an action to unstable_after via closure',
          path: '/cookies/action-to-after/via-closure',
        },
      ])('$title', async ({ path }) => {
        const session = await next.browser(path)

        // trigger an action
        await session.elementByCss('[type="submit"]').click()
        await retry(async () => {
          // the .set() in unstable_after should error
          expect(getCliOutput()).toMatch(EXPECTED_ERROR_IN_AFTER)
        })

        // no cookie should be set
        expect(await session.eval('document.cookie')).not.toInclude(
          'illegalCookie'
        )
      })

      it.each([
        {
          title: 'from a route handler to unstable_after',
          path: '/cookies/route-handler-to-after',
        },
        {
          title: 'from a route handler to unstable_after via closure',
          path: '/cookies/route-handler-to-after/via-closure',
        },
      ])('$title', async ({ path }) => {
        const response = await next.fetch(path, { method: 'POST' })
        await response.text()
        expect(response.status).toBe(200)

        // no cookie should be set
        expect(response.headers.get('set-cookie')).toBe(null)

        // the .set() in unstable_after should error
        await retry(async () => {
          expect(getCliOutput()).toMatch(EXPECTED_ERROR_IN_AFTER)
        })
      })

      it.each([
        {
          title: 'from middleware to unstable_after',
          path: '/cookies/middleware-to-after',
        },
        {
          title: 'from middleware to unstable_after via closure',
          path: '/cookies/middleware-to-after/via-closure',
        },
      ])('$title', async ({ path }) => {
        const response = await next.fetch(path)
        await response.text()
        expect(response.status).toBe(200)

        // no cookie should be set
        expect(response.headers.get('set-cookie')).toBe(null)

        // the .set() in unstable_after should error
        await retry(async () => {
          expect(getCliOutput()).toMatch(EXPECTED_ERROR_IN_AFTER)
        })
      })
    }
  })
})