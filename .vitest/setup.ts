import '@testing-library/jest-dom/extend-expect'
import { fetch } from 'cross-fetch';
import { server } from '../src/mocks/server'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

global.fetch = fetch;
