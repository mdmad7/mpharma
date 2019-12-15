export default {
  get: jest.fn(() => Promise.resolve({ status: 200, data: { products: [] } }))
};
