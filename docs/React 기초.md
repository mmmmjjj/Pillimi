# React

​    

### 클래스형 vs 함수형

https://velog.io/@sdc337dc/0.%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8

​    

### LifeCycle

https://velog.io/@st2702/React-Lifecycle-%EC%83%9D%EB%AA%85%EC%A3%BC%EA%B8%B0

​    

### 기초

1. 간단한 컴포넌트

   - React 컴포넌트는 `render()`라는 메서드를 구현하는데, 이것은 데이터를 입력받아 화면에 표시할 내용을 반환하는 역할

   - 컴포넌트로 전달된 데이터는 `render()` 안에서 `this.props`를 통해 접근 가능

     ```react
     class HelloMessage extends React.Component {
       render() {
         return (
           <div>
             Hello {this.props.name}
           </div>
         );
       }
     }
     
     ReactDOM.render(
       <HelloMessage name="Taylor" />,
       document.getElementById('hello-example')
     );
     
     // XML과 유사한 문법인 JSX를 사용한 코드
     // 결과 Hello Taylor
     ```

     ​    

2. 상태를 가지는 컴포넌트

   - 컴포넌트는 `this.props`를 이용해 입력 데이터를 다루는 것 외에도 내부적인 상태 데이터를 가질 수 있음 (`this.state`로 접근)

   - 컴포넌트의 상태 데이터가 바뀌면 `render()`가 다시 호출되어 마크업이 갱신

     ```react
     class Timer extends React.Component {
       constructor(props) {
         super(props);
         this.state = { seconds: 0 };
       }
     
       tick() {
         this.setState(state => ({
           seconds: state.seconds + 1
         }));
       }
     
       componentDidMount() {
         this.interval = setInterval(() => this.tick(), 1000);
       }
     
       componentWillUnmount() {
         clearInterval(this.interval);
       }
     
       render() {
         return (
           <div>
             Seconds: {this.state.seconds}
           </div>
         );
       }
     }
     
     ReactDOM.render(
       <Timer />,
       document.getElementById('timer-example')
     );
     
     // 결과 Seconds: 흐른 시간(초)
     ```

     ​    

3. 애플리케이션

   - `props`와 `state`를 사용해서 간단한 Todo 애플리케이션을 만들 수 있음

   - `state`를 사용해 사용자가 입력한 텍스트와 할 일 목록을 관리

   - 이벤트 핸들러들이 인라인으로 각각 존재하는 것처럼 보이지만, 실제로는 이벤트 위임을 통해 하나로 구현

     ```react
     class TodoApp extends React.Component {
       constructor(props) {
         super(props);
         this.state = { items: [], text: '' };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
       }
     
       render() {
         return (
           <div>
             <h3>TODO</h3>
             <TodoList items={this.state.items} />
             <form onSubmit={this.handleSubmit}>
               <label htmlFor="new-todo">
                 What needs to be done?
               </label>
               <input
                 id="new-todo"
                 onChange={this.handleChange}
                 value={this.state.text}
               />
               <button>
                 Add #{this.state.items.length + 1}
               </button>
             </form>
           </div>
         );
       }
     
       handleChange(e) {
         this.setState({ text: e.target.value });
       }
     
       handleSubmit(e) {
         e.preventDefault();
         if (this.state.text.length === 0) {
           return;
         }
         const newItem = {
           text: this.state.text,
           id: Date.now()
         };
         this.setState(state => ({
           items: state.items.concat(newItem),
           text: ''
         }));
       }
     }
     
     class TodoList extends React.Component {
       render() {
         return (
           <ul>
             {this.props.items.map(item => (
               <li key={item.id}>{item.text}</li>
             ))}
           </ul>
         );
       }
     }
     
     ReactDOM.render(
       <TodoApp />,
       document.getElementById('todos-example')
     );
     ```

   ​    

4. 외부 플러그인을 사용하는 컴포넌트

   - React는 유연하며 다른 라이브러리나 프레임워크를 함께 활용할 수 있음

   - 외부 마크다운 라이브러리인 **remarkable**을 사용해 `<textarea>`의 값을 실시간으로 변환

     ```react
     class MarkdownEditor extends React.Component {
       constructor(props) {
         super(props);
         this.md = new Remarkable();
         this.handleChange = this.handleChange.bind(this);
         this.state = { value: 'Hello, **world**!' };
       }
     
       handleChange(e) {
         this.setState({ value: e.target.value });
       }
     
       getRawMarkup() {
         return { __html: this.md.render(this.state.value) };
       }
     
       render() {
         return (
           <div className="MarkdownEditor">
             <h3>Input</h3>
             <label htmlFor="markdown-content">
               Enter some markdown
             </label>
             <textarea
               id="markdown-content"
               onChange={this.handleChange}
               defaultValue={this.state.value}
             />
             <h3>Output</h3>
             <div
               className="content"
               dangerouslySetInnerHTML={this.getRawMarkup()}
             />
           </div>
         );
       }
     }
     
     ReactDOM.render(
       <MarkdownEditor />,
       document.getElementById('markdown-example')
     );
     ```

     