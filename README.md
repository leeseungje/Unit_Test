# Unit_Test

## Jest란 무엇인가?

FaceBook에 의해서 만들어진 테스팅 프레임 워크.
최소한의 설정으로 동작하며 Test Case를 만들어서 어플리케이션 코드가 잘 돌아가는지 확인.
`단위(Unit) 테스트`를 위해서 이용

### Jest가 Test 파일을 찾는 방법

- 파일명을 `{filename}.test.js`로 하는 방식
- 파일명을 `{filename}.spec.js`로 하는 방식
- 폴더명을 `tests` 폴더 안에 있는 파일

### Jest 파일 구조

```javascript
describe("테스트 그룹명, () => { // 테스트 그룹화
  it("테스트1", () => { // test (it)
    expoect(typeof producController.createProduct).toBe("function");
  })
  it("테스트2", () => { // test (it)
    expoect(typeof producController.createProduct).toBe("function");
  })
})
```

#### expect

- expect 함수는 값을 테스트할 때마다 사용됨.
  그리고 expect 함수 혼자서는 거의 사용이 가능하지 않아서 matcher와 함께 사용된다.

#### matcher

- 다른 방법으로 값을 테스트 하도록 matcher를 사용함

```javascript
test('two pluse two is four', () => {
  expect(2 + 2).toBe(4)
})

test('two pluse two is not five', () => {
  expect(2 + 2).not.toBe(4)
})
```

- 이때 toBe또는 not.toBe는 `matcher`가 된다.

-`App.test.js`

```javascript
import App from './App'
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/lean react/i)
  expect(linkElement).toBoInTheDocument() // 링크 엘리멘트가 document에 있는지 찾는것
})
```

### render 함수

Dom에 컴포넌트를 랜더링하는 함수
[custom matcher](https://github.com/testing-library/jest-dom#custom-matchers)가 많다

### Query 함수 란?

쿼리는 페이지에서 요소를 찾기 위해 테스트 라이브러리가 제공하는 방법이다.
여러 유형의 쿼리("get", "find", "query")가 있다. 이들 간의 차이점은 요소가 발견되지 않으면 쿼리에서 오류가 발생하는지 또는 Promise를 반환하고 다시 시도하는지 여부 이다.
선택하는 페이지 콘텐츠에 따라 다른 쿼리가 다소 적절할 수 있다.

- `getBy...`: 쿼리에 대해 일치하는 노드를 반환하고 일치하는 요소가 없어나 둘 이상의 일치가 발견되면 설명 오류를 발생시킨다. (둘 이상의 요소가 예상되는 경우 대신 getAllBy 사용)
- `queryBy...`: 쿼리에 대해 일치하는 노드를 반환하고 일치하는 요소가 없으면 null 반환. 이것은 존재하지 않는 요소를 어설션하는 데 유용함,
- `findBy...`: 주어진 쿼리와 일치하는 요소가 발견되면 해결되는 Promise를 반환한다. 요소가 발견되지 않거나 기본 제한 시간인 1000ms후에 둘 이상의 요소가 발견되면 약속이 거부됨.
