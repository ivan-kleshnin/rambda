import { composeAsync } from './composeAsync'
import { delay } from './delay'
import { partitionAsync } from './partitionAsync'

test.only('with composeAsync', async () => {
  const predicate = async (x, i) => {
    await delay(100)
    expect(typeof i).toBe('number')

    return x > 2
  }
  const list = [ 1, 2, 3, 4, 11 ]

  const result = await composeAsync(partitionAsync(predicate), x =>
    x.filter(xx => xx < 10))(list)
  const expectedResult = [
    [ 3, 4 ],
    [ 1, 2 ],
  ]

  expect(result).toEqual(expectedResult)
})

test('with array', async () => {
  const predicate = async (x, i) => {
    await delay(100)
    expect(typeof i).toBe('number')

    return x > 2
  }
  const list = [ 1, 2, 3, 4 ]

  const result = await partitionAsync(predicate, list)
  const expectedResult = [
    [ 3, 4 ],
    [ 1, 2 ],
  ]

  expect(result).toEqual(expectedResult)
})

test('with object', () => {
  const predicate = (value, prop) => {
    expect(typeof prop).toBe('string')

    return value > 2
  }
  const hash = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  }

  const result = partitionAsync(predicate)(hash)
  const expectedResult = [
    {
      c : 3,
      d : 4,
    },
    {
      a : 1,
      b : 2,
    },
  ]

  expect(result).toEqual(expectedResult)
})

test('readme example', () => {
  const list = [ 1, 2, 3 ]
  const obj = {
    a : 1,
    b : 2,
    c : 3,
  }
  const predicate = x => x > 2

  const result = [
    partitionAsync(predicate, list),
    partitionAsync(predicate, obj),
  ]
  const expected = [
    [ [ 3 ], [ 1, 2 ] ],
    [
      { c : 3 },
      {
        a : 1,
        b : 2,
      },
    ],
  ]
  expect(result).toEqual(expected)
})
