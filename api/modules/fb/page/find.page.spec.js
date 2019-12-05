import findPage from './find.page'

describe('test find page', () => {
  it('should get page details', async () => {
    const id = '373024379493427'

    const data = await findPage(id)
    expect(data).toEqual(expect.anything())
  })
})
