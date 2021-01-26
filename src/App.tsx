import React from 'react';
import './App.css';
import {BlogDetail} from "./components/BlogDetail/BlogDetail";
import {Header} from "./components/Header/Header";
import {Menu, SideNav} from "./components/SideNav/SideNav";
import {List} from "./components/List/List";
import {Write} from "./components/Write/Write";

function App() {

    let menus: Menu[] = [
        {
            label: "게시글 리스트",
            component: <List></List>
        },
        {
            label: "상세 페이지",
            component: <BlogDetail></BlogDetail>
        },
        {
            label: "글쓰기",
            component: <Write></Write>
        }
    ]


    return (
        <div className="App" style={{"height": "100%"}}>
            <SideNav menus={menus}>
                <Header imageUrl={"https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1603852170/noticon/iwbd31aaoxcxh1ololsi.png"}></Header>
            </SideNav>
        </div>
    );
}

export default App;
