module.exports = new Proxy(
  {},
  {
    get: (_target, property) => {
      return property
    },
  },
)
