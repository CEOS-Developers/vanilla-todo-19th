# 1주차 미션: Vanilla-Todo

- [배포 링크](https://vanilla-todo-19th.vercel.app/)

## 미션 목표

- VSCode, Prettier를 이용하여 개발 환경을 관리합니다.
- HTML/CSS의 기초를 이해합니다.
- JavaScript를 이용한 DOM 조작을 이해합니다.
- Vanilla Js를 이용한 어플리케이션 상태 관리 방법을 이해합니다.

## Key Questions

1. DOM은 무엇인가요?
   DOM은 Document Object Model의 약자로, 웹 문서의 구조를 나타내는 방식입니다. DOM을 이용하여 HTML 요소로 구성된 웹 페이지를 동적으로 움직이게 만들 수 있습니다. DOM은 트리 구조로 구성되어, 트리의 각 브랜치는 노드에서 끝나며 각 노드는 객체를 갖습니다.

2. HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?
   document.createElement() 함수를 사용하는 것이 가장 직관적이라하여 이번 과제에서 많이 사용했습니다. 이는 새로운 HTML 요소를 생성하여 이에 새로운 속성을 추가합니다. 그리고 문서 내 다른 요소에 append, appendChild를 통해 이를 추가할 수 있습니다. document.createElement() 함수 외에도 innerHTML속성을 사용하여 내부 HTML을 직접 변경하는 방법도 있습니다.

3. Semantic tag에는 어떤 것이 있으며, 이를 사용하는 이유는 무엇일까요?
   semantic tag는 의미론적 태그로 HTML에서 사용되는 의미를 명확하게 전달하여 웹 페이지의 구조를 더 명확하게 해줍니다. 이를 통해 코드의 가독성과 유지 보수성을 높일 수 있습니다. 실제로 semantic tag를 사용하면 <div>를 사용하는 것보다 코드가 눈에 쉽게 들어오는 것 같아 이번 과제에서도 최대한 semantic tag를 사용하려고 했습니다.

- <header>: 웹 페이지의 헤더 부분을 나타냄
- <nav>: 네비게이션 링크의 집합을 나타냄
- <section>: 주제별로 문서를 나누는 데 사용됨
- <footer>: 웹 페이지의 하단 푸터 부분을 나타냄
- <main>: 문서의 주요 콘텐츠를 나타내며 한번씩만 사용됨

4. Flexbox Layout은 무엇이며, 어떻게 사용하나요?
   Flexbox는 css의 레이아웃 모델로 행과 열로 아이템을 정렬합니다.

- flex-direction: 주 축의 방향을 행과 열로 설정함
- flex-wrap: 아이템들이 컨테이너 밖으로 넘어갔을 때 줄바꿈 여부를 설정함
- justify-content: 주 축을 중심으로 어떠한 방식으로 아이템을 정렬할 건지 설정함
- align-items: 교차 축을 중심으로 어떠한 방식으로 아이템을 정렬할 건지 설정함

5. JavaScript가 다른 언어들에 비해 주목할 만한 점에는 어떤 것들이 있나요?
   자바스크립트는 인터프리터 언어로 다른 언어에 비해 시간이 적게 소요되어 프로그램 실행 속도를 높일 수 있습니다.
   다양한 라이브러리와 프레임워크를 제공하여 효율적이고 빠르게 개발할 수 있습니다.

6. 코드에서 주석을 다는 바람직한 방법은 무엇일까요?
   무작정 주석을 많이 다는 것은 오히려 가독성을 낮추는 것 같아 간결하고 명확하게 작성하는 것이 바람직하다고 생각합니다. 그리고 주석의 스타일 또한 일관되게 작성해야 합니다.

# 링크 및 참고자료

- [체크박스 커스텀](https://sophiecial.tistory.com/34)
- [localStorage](https://hianna.tistory.com/697)
- [오늘 날짜 구하기](https://gent.tistory.com/413)
