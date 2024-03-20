# 1주차 미션: Vanilla-Todo

## 🐻 배포 링크

https://agijagi-todo-blue.vercel.app/

## 👩‍💻 구현 기능

### 기본 기능

- 할 일 추가, 완료, 삭제
- Progress Bar로 할 일 완료 현황 확인
- 오늘 날짜 세팅
- Local Storage를 이용하여 기존 데이터 불러오기

### 추가 기능

- 할 일 모두 완료/미완료에 따른 Progess Bar 텍스트 동적 업데이트
- 오늘 날짜에 요일 추가
- 할 일 중복 추가 예외 처리

## 🥳 후기

오랜만에 Vanilla JS로 기능을 구현하려니까 React가 정말 편리하다는 것을 다시 한 번 느끼게 되었습니다.. localStorage를 처음 알게 되었는데 너무 유용한 기능이네요! 가벼운 토이 프로젝트 할 때 유용할 것 같아요. 빨리 React도 쓰고 싶습니다 ㅎㅎ

## 💡 새롭게 배운 점

- localStorage, sessionStorage의 개념과 활용
- filter 메서드의 활용: 어떤 기능인지만 알고 있던 메서드를 직접 과제 기능 구현을 하는데 써보면서 filter 메서드의 유용성을 알게 되었습니다.
- appendChild()의 중요한 특징: Todo->Done 이동할 때(Done->Todo도 마찬가지) done의 ul에 li를 appendChild() 메소드로 추가하고, todo의 ul에서는 해당 li를 remove 해주어야 한다고 생각했는데, done에 appendChild()만 해줘도 todo에서 자동으로 remove 되는 현상이 발생했습니다!😮 원하던 기능이라 이게 왜 되지..?? 했는데..!

  > appendChild() 메소드는 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙입니다. 만약 주어진 노드가 이미 문서에 존재하는 노드를 참조하고 있다면 appendChild() 메소드는 노드를 현재 위치에서 새로운 위치로 이동시킵니다. (문서에 존재하는 노드를 다른 곳으로 붙이기 전에 부모 노드로 부터 지워버릴 필요는 없습니다.)

  우왕.. 또 새롭게 알아갑니다!

* 웹 접근성의 의미: 참고 자료에서 알게된 내용입니다.

  > 고령자, 장애인 같은 신체적, 환경적 조건에 제한이 있는 사용자를 포함해 모든 사용자들이 동등하게 접근할 수 있는 웹 콘텐츠를 제작하는 방법을 말합니다.

  이전까지는 웹 접근성이라는게 그냥 단순히 사용자가 웹 페이지에 잘 접근할 수 있는 정도를 의미하는 줄 알았는데 이런 의미를 지니고 있었다니.. 정말 중요한 개념이네요.

  그리고 `img` 태그의 `alt` 속성이 이미지 로드에서 오류가 났을 때 대체할 텍스트를 위한 용도라고 생각했는데, 이것이 `img` 콘텐츠를 텍스트화 하기 위해서도 사용될 수 있다는 것도 알게 되었습니다.

* innerText vs. textContent

  > textContent는 `<script>`와 `<style>` 요소를 포함한 모든 요소의 텍스트 콘텐츠를 가져옵니다. 반면 innerText는 "사용자에게 보여지는" 요소의 텍스트 콘텐츠만 가져옵니다.

  [이 블로그](https://velog.io/@kim_unknown_/JavaScript-Difftext)의 예제를 보면 아주 잘 이해할 수 있습니다.

## 🔥 어려웠던 부분 / 의문점

- localStroage 기능 구현: 처음 다뤄보는 기능이라 시간이 꽤 걸렸습니다. 전역 배열을 생성하는게 싫어서 `innerHTML`을 이용하는 등 다른 방식으로 시도해봤으나.. 실패하고 결국 빙빙돌아 다시 배열을 생성하는 방식으로 구현했습니다.
- 제 코드가 과연 효율적일지 의문이 듭니다. 특히 moveItem, deleteItem 함수에서 isDone을 확인하고 if문으로 그에 따른 처리를 해주는 부분이 마음에 들지 않습니다.😑

## ✨ 더 구현해보고 싶은 기능

- 모바일 화면 반응형
- CSS 단위: 반응형 CSS 단위에 대한 공부가 좀 더 필요할 것 같습니다.🥲 px 대신 rem을 적극적으로 활용해보고 싶어요!
- form 태그 이용: form 태그가 웹사이트에서 회원가입이나 로그인, 검색창과 같은 사용자 정보 데이터를 입력 받아 서버로 전송할 때 사용한다는 것은 알고 있는데, 어떻게 사용해야 할지 확실히 모르겠어서 form 태그 없이 기능을 구현했습니다. 효율적인 데이터 전송에 도움이 되는 것 같아 이용해보고 싶습니다!

## ❓ Key Questions

### 1. DOM은 무엇인가요?

> DOM(Document Object Model, 문서 객체 모델)은 HTML, XML 문서의 Programming interface 이다. DOM은 문서의 구조화된 표현(structured representation)을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다

DOM은 Javascript가 HTML에 접근하여 제어할 수 있도록 하는 도구이다.
웹페이지 문서의 구조를 표현하는 HTML은 컴퓨터에게는 그냥 줄글일 뿐이고, 이를 구조화하기 위하여 HTML parser를 통해 DOM tree를 생성한다.

![![DOM tree](image.png)](src/DOM-tree.png)

이 DOM tree는 HTML 태그를 객체로 바꿔줘서, Javascript가 이 객체의 다양한 프로퍼티와 메소드(DOM API)를 통해 웹 페이지를 제어할 수 있게 된다.

DOM API에는 querySelector, innerText, nodeList, classList, addEventListener 등이 있다.

### 2. HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?

1. `document.createElement("태그명")`

   ```js
   const newElement = document.createElement("div");
   ```

   태그 이름을 인수로 전달하여 새 HTML 요소를 만든다.

2. `innerHTML`

   ```js
   const container = document.getElementById("container");
   container.innerHTML = "<div></div>";
   ```

   부모 요소의 innerHTML 속성을 통해 HTML 문자열을 삽입하여 새 요소를 추가한다.

3. `insertAdjacentHTML(위치, 텍스트)`

   ```js
   const container = document.getElementById("container");
   container.insertAdjacentHTML("beforeend", "<div></div>");
   ```

   지정된 위치에 HTML 문자열을 삽입하여 새 요소를 추가하는 메서드이다. 위치는 target HTML Element의 앞(beforebegin), 뒤(afterend), 첫번째 자식(afterbegin), 마지막자식(beforeend)으로 지정할 수 있다.

위의 3가지 방법 중 `document.createElement("태그명")`가 가장 적합하다. `innerHTML`이나 `insertAdjacentHTML()`는 문자열이 그대로 HTML로 파싱되어 삽입하기 때문에, 웹 페이지에 악성 스크립트를 삽입하는 XSS(Cross-Site Scripting) 공격에 취약하다.

### 3. Semantic tag에는 어떤 것이 있으며, 이를 사용하는 이유는 무엇일까요?

**Semantic tag란?**

`<div>`, `<span>`과 같이 의미는 없지만 구역을 나누기 위한 태그를 넘어서, 의미를 가지는 태그를 말한다.

**Semantic tag의 종류**

![![Semantic tag](image-1.png)](src/semantic-tag.png)

- `<header>` : 사이트의 헤더 영역에 사용, 주로 사이트의 로고나 이름 등이 포함된다.
- `<nav>` : 내비게이션을 의미하는 태그로, 주로 메뉴 영역에 사용된다.
- `<main>` : 메인 컨텐츠 영역에 사용되며, `<section>`, `<article>`, `<aside>` 등이 포함된다.
- `<section>` : 주로 `<article>`을 포함하는 태그로 섹션별로 나눠줄 때 사용한다.
- `<article>` : 개별 콘텐츠, 반복되는 콘텐츠를 나타낼 때 사용한다.

  > **`<section>`과 `<article>`의 차이**<br> `<section>`은 주요 콘텐츠의 구역을 나누는데 사용되고, `<article>`은 블로그 포스팅 글, 기사 글 같이 독립적인 콘텐츠를 나타낼 때 사용된다.

- `<aside>` : 메인 컨텐츠 이외의 내용을 담을때 주로 사용한다. 보통 광고나 사이드바에 사용된다.
- `<footer>` : 페이지의 하단에 주로 고객센터나 회사 정보를 담을때 사용한다.

**Semantic tag 사용 이유**

시맨틱 태그를 사용하는 이유는 다음과 같다.

1. 웹 접근성 향상

   시각장애인이 스크린 리더 등을 사용했을 경우, 시맨틱 태그를 통해 사이트의 구조를 더욱 쉽게 이해할 수 있다. 예를 들어, `<nav>`의 경우, 콘텐츠에 탐색 링크가 포함되어 있음을 나타낼 수 있고, `<article>`의 경우에는 독립형 콘텐츠가 포함되어 있음을 나타낼 수 있다.

2. 검색 엔진 최적화(SEO)

   Google과 같은 검색엔진은 태그를 기반으로 페이지의 주요 키워드를 파악한다. 예를 들어 글 제목에 h1 태그를 쓰거나 본문에 main 태그를 쓰면 그걸 바탕으로 키워드를 추출하고 검색에 노출시킨다. 따라서 시맨틱 태그는 관련 키워드와 문구에 대해 웹페이지를 최적화하는 데 도움이 되며, 이를 통해 검색결과 상에서 웹 사이트 노출 순위를 높이고 더 많은 트래픽을 유도할 수 있다.

3. 코드 유지보수와 가독성

   시맨틱 태그의 이름 자체가 해당 요소의 역할을 설명하기 때문에 다른 개발자가 코드를 이해하고 수정하기 쉬워진다.

### 4. Flexbox Layout은 무엇이며, 어떻게 사용하나요?

Flexbox는 유연한 박스 모델을 사용하여 요소 간의 배치를 효율적으로 제어하는 레이아웃 방식이다. Flexbox를 사용하면 요소의 크기를 동적으로 조정하고, 정렬 및 배치를 쉽게 설정할 수 있다.

Flexbox는 Flex Container와 Flex Item으로 구성된다. Container은 Flex의 영향을 받는 전체 공간이고, Item들은 설정된 속성에 따라 특정 형태로 배치된다.

- Flex Container에 적용하는 속성들: `display:flex`, `flex-direction`, `flex-wrap`, `flex-flow`(`flex-direction`+`flex-wrap`), `justify-content`, `align-items`, `align-content`

- Flex Item에 적용하는 속성들: `flex-basis`, `flex-grow`, `flex-shrink`, `flex`(앞의 3개를 다 합친 것), `align-self`, `order`, `z-index`

### 5. JavaScript가 다른 언어들에 비해 주목할 만한 점에는 어떤 것들이 있나요?

1. 인터프리터 언어

   자바스크립트는 인퍼프리터 언어이다. 인터프리터 언어는 프로그래밍 언어를 컴파일하여 기계 언어로 바꾸지 않고, 프로그래밍 언어로 되어 있는 코드를 한줄씩 읽으며 실행한다. 그렇기 때문에 컴파일이 필요한 다른 프로그래밍 언어에 비해 시간이 적게 소요된다.

2. 동적 타입

   자바스크립트는 변수에 타입이 정해져 있지 않다. 컴파일 타임(소스 파일이 실행 파일로 만들어 지기까지의 시간)이 아니라 런타임(실행 파일이 실행되어 종료되기 까지의 시간) 시 변수의 타입이 결정된다. 따라서 유연성이 높고 컴파일 시 타입을 명시해주지 않아도 되기 때문에 개발 속도가 향상된다.<br>
   [참고 자료 1](https://yeko90.tistory.com/entry/compile-time%EC%BB%B4%ED%8C%8C%EC%9D%BC-%ED%83%80%EC%9E%84-vs-runtime%EB%9F%B0%ED%83%80%EC%9E%84-%EC%B0%A8%EC%9D%B4), [참고 자료 2](https://velog.io/@ericagong/CS-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%ED%83%80%EC%9E%84%EC%9D%B4%EB%9E%80-%EB%9F%B0%ED%83%80%EC%9E%84%EC%9D%B4%EB%9E%80)

### 6. 코드에서 주석을 다는 바람직한 방법은 무엇일까요?

주석에 의존하기 보다는 깔끔하고 표현력이 좋은 코드를 작성하는 것이 좋다.
하지만 코드만으로도 의도를 표현하기 힘들다면, 기능/함수 단위로 명확하고 간결한 주석을 달아준다.

앞으로 할 일을 주석으로 써두는 경우도 있다.
