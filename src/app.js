import React from "react";
import ReactDOM from "react-dom";

import Test from './src/Test';
import "./common/style/main.less";

class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: "hello world",
            bBar: true
        };
    }
    changeComments() {
        this.setState({
            comments: "change comments"
        });
        // console.log(this.refs.test);
        // console.log(this.test);
    }
    unMountTest() {
        this.setState({
            bBar: false
        });
    }
    render() {
        const { comments, bBar } = this.state;
        return (<div className="wrap">
            <div className="parent">
                <p>
                    <span className="btn" onClick={this.changeComments.bind(this)}>change comments</span>
                    <span className="btn" onClick={this.unMountTest.bind(this)}>卸载组件</span>
                </p>
            </div>
            <div className="child">
            {
                bBar
                ?
                <Test comments={comments} ref={(dom) => this.test = dom} />
                :
                null
            }
            </div>
        </div>);
    }
}

ReactDOM.render(
    <Wrap />,
    document.getElementById("root")
);