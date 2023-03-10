module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/specs/**/*.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  }
}
