// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from "./mocks/server"

// 모든 테스트전에 서버를 생성 한다.
beforeAll(() => server.listen());

// 하나하나 테스트 이후에 mocking 서버(handler.js)를 리셋 시켜준다.
afterEach(() => server.resetHandlers());

// 테스트가 끝나면 서버를 꺼준다.
afterAll(() => server.close());