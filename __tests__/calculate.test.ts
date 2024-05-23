import { calculate } from '@/app/api/dashboard/nextSleepTime/_utils/calculate'

describe('calculate', () => {
  describe('引数Aがhogeのとき', () => {
    const a = 'hoge'
    describe('引数Bがfugaのとき', () => {
      const b = 'fuga'
      it('返す値のテスト', async () => {
        calculate(a, b)
      })
    })
    describe('引数Bがhogeのとき', () => {
      const b = 'hoge'
      it('返す値のテスト', async () => {
        calculate(a, b)
      })
    })
  })
  describe('引数Aがhugaのとき', () => {
    const a = 'huga'
    describe('引数Bがfugaのとき', () => {
      const b = 'fuga'
      it('返す値のテスト', async () => {
        calculate(a, b)
      })
    })
    describe('引数Bがhogeのとき', () => {
      const b = 'hoge'
      it('返す値のテスト', async () => {
        calculate(a, b)
      })
    })
  })
})
