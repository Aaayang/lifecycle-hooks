import React from 'react';
import ReactDOM from 'react-dom';


export default class Test extends React.Component {
    constructor(props) {
        super(props);
        console.log("#1", "constructor");
        this.state = {
            name: "aaayang"
        };
    }
    componentWillMount() {
        // 有更改内部状态的机会
        // this.state.name = "componentWillMount的时候有机会改变名字";
        console.log("#2", "componentWillMount");
    }
    componentDidMount() {
        // 和其他框架配合的机会
        // 获取后端数据的机会
        // 有获取原生DOM的机会
        console.log("#4", "componentDidMount");

        // const dom = ReactDOM.findDOMNode(this);
        // let isYellow = false;
        // this.state.loopNum = setInterval(function () {
        //     if (isYellow) {
        //         dom.style.backgroundColor = "red";
        //         isYellow = false;
        //     }
        //     else {
        //         dom.style.backgroundColor = "yellow";
        //         isYellow = true;
        //     }
        // }, 3000);
    }
    componentWillReceiveProps(nextProps) {
        // 初始化时不调用，旧的this.props.comments
        // 外部传入props时调用，即使传入的props是一样的也会
        if(this.props.comments !== nextProps.comments) {
            // 不一样时才xxx
            this.setState({

            });
        }
        console.log("#5", "componentWillReceiveProps");
        // console.log(nextProps.comments); // 若传过来一个comments可以这样获取
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 有机会判断新的props和state是否真的改变了
        // console.log(this.props.comments, nextProps.comments);
        console.log("#6", "shouldComponentUpdate");
        // 强制刷新时会忽略shouldComponentUpdate,直接执行下面的update
        // setState和外部重新渲染时都会触发shouldComponentUpdate，下面返回false时不会执行update，返回true会执行
        // return false;
        // 不一样时才willUpdate和didUpdate
        if (this.props.comments !== nextProps.comments) {
            // 这里setState又会触发自己shouldComponentUpdate
            // this.setState({

            // });
            return true;
        }
        // if(this.state.name !== nextState.name) {
        //     return true;
        // }
        return true;
    }
    // 下面update会根据shouldComponentUpdate的返回值来决定是否执行，真就执行，假不执行，forceUpdate会绕过shouldComponentUpdate
    // 外部重新渲染时会被调用、内部状态改变、forceUpdate
    componentWillUpdate(nextProps, nextState) {
        // 内部不要调用setState、forceUpdate会死循环
        // 新的props和state
        console.log("#7", "componentWillUpdate");
    }
    componentDidUpdate(oldProps, oldState) {
        // 旧的props和state
        console.log("#8", "componentDidUpdate");
        // this.setState({

        // });
    }

    updateName() {
        // 内部的状态更新时也会调用componentWillUpdate和componentDidUpdate
        this.setState({
            name: "longge"
        });
        // 强制渲染时也会，会跳过shouldComponentUpdate
        // this.forceUpdate();
    }
    componentWillUnmount() {
        console.log("#9", "componentWillUnmount");
        clearInterval(this.state.loopNum);
    }
    render() {
        console.log("#3", "render");
        const { name } = this.state;
        return (<div>
            <p className="txt-sty">this.state.name:  {name}</p>
            <p className="txt-sty">this.props.comments:  {this.props.comments}</p>
            <span className="btn" onClick={this.updateName.bind(this)}>update state</span>
        </div>);
    }
}