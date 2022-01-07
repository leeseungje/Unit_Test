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

## TDD (Test Driven Development)란?

- 실제 코드를 작성하기 전에 케스트 코드를 먼저 작성.
- 테스트 코드를 작성한 후 그 테스트 코드를 Pass할 수 있는 실제 코드를 작성

1. 원하고자 하는 기능의 테스트 코드 작성
2. 테스트 실행 (Fail)
3. 테스트 코드에 맞는 실제 코드 작성
4. 테스트 실행 (Pass)

## TDD를 하면 좋은점

1. TDD를 하므로 인해 많은 기능을 테스트하기에 소스 코드에 안정감이 부여된다.
2. 실제 개발하면서 많은 시간이 소요되는 부분은 디버깅 부분이기에 TDD를 사용하면 디버깅 시간이 줄어들고 실제 개발 시간도 준다.
3. 소스 코드 하나하날를 더욱 신중하게 짤 수 있기 때문에 깨끙한 코드가 나올 확률이 높다.

- counter.js

```javascript
const [count, setCount] = useState(0)
const [isDisabled, setDisabled] = useState(false)
const increase = () => {
  setCount(count + 1)
}
const decrease = () => {
  setCount(count - 1)
}
const handleOff = () => {
  setDisabled(!isDisabled)
}
return (
  <div className="App">
    <header className="App-header">
      <h3 data-testid="counter">{count}</h3>
      <div>
        <button
          disabled={isDisabled}
          onClick={decrease}
          data-testid="minus-button"
        >
          -
        </button>
        <button
          disabled={isDisabled}
          onClick={increase}
          data-testid="plus-button"
        >
          +
        </button>
      </div>
      <button
        style={{ backgroundColor: 'blue' }}
        onClick={handleOff}
        data-testid="on/off-button"
      >
        on/off
      </button>
    </header>
  </div>
)
```

- counter.test.js

```javascript
test('the Counter Starts at 0', () => {
  render(<App />)
  // screen object를 이용해서 원하는 엘레멘트에 접근(접근할 때 id로)
  const counterElement = screen.getByTestId('counter')
  // id가 counter인 엘레멘트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent(0)
})

test('플러스 버튼에 "+" 버튼인지 체크', () => {
  render(<App />)

  const buttonElement = screen.getByTestId('plus-button')
  expect(buttonElement).toHaveTextContent('+')
})

test('플러스 버튼에 "-" 버튼인지 체크', () => {
  render(<App />)

  const buttonElement = screen.getByTestId('minus-button')
  expect(buttonElement).toHaveTextContent('-')
})

test('플러스버튼을 눌렀을 시 1로 바뀌었는지 확인', () => {
  render(<App />)
  const buttonElement = screen.getByTestId('plus-button')
  // click plus button
  fireEvent.click(buttonElement)
  const counterElement = screen.getByTestId('counter')
  expect(counterElement).toHaveTextContent(1)
})

test('마이너스버튼을 눌렀을 시 -1로 바뀌었는지 확인', () => {
  render(<App />)
  const buttonElement = screen.getByTestId('minus-button')
  // click minus button
  fireEvent.click(buttonElement)
  const counterElement = screen.getByTestId('counter')
  expect(counterElement).toHaveTextContent(-1)
})

test('on/off버튼 색상이 파란색인지 확인', () => {
  render(<App />)
  const buttonElement = screen.getByTestId('on/off-button')
  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' })
})

test('on/off버튼을 눌렀을 경우 비활성화가 되는지 확인', () => {
  render(<App />)
  const buttonElement = screen.getByTestId('on/off-button')
  // click plus button
  fireEvent.click(buttonElement)
  const plusButtonElement = screen.getByTestId('plus-button')
  const minusButtonElement = screen.getByTestId('minus-button')
  expect(plusButtonElement && minusButtonElement).toBeDisabled()
})
```

1. test.only, test.skip 기능도 있다.
2. test.only: 해당 테스트만 테스트 하고 나머지는 스킵
3. test.skip: 해당 테스트만 스킵하고 나머지 테스트

### FireEvent Api

유저가 발생시키는 액션(이벤트)에 대한 테스트를 해야되는 경우 사용
[링크](https://testing-library.com/docs/dom-testing-library/api-events/)
