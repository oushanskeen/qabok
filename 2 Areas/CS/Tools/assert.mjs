const assert = (f, params, desiredOutcome) => {
  const actualOutput = f(params)
  const _toStr = (x) => JSON.stringify(x)
  const want = _toStr(actualOutput)
  const has = _toStr(desiredOutcome)
  if (want == has) {
    return "Success!"
  } else {
    return (
      `
      ✅ EXPECTED
      ${has}
      ❌ BUT RECEIVED
      ${want}
    `)
  }
}

export default assert