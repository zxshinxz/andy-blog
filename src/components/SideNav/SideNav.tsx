import React, {useEffect, useState} from 'react';

/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react'

function style() {
    return css`
      display: flex;
      justify-content: flex-start;
      height: 100%;
      #sideNav {
          width: 20%;
          height: 100%;
          background-color: #1a506d;
          color: #ffffff;
          .sideNavMenu {
            cursor: pointer;
            margin-top: 20px;
            font-weight: bold;
            font-size: 16px;
          }
      }
      #content {
          width: 80%;
          height: 100%;
          .main-content {
           padding-top: 20px;
          }
      }
    `
}

export interface Menu {
    label: string,
    component: JSX.Element
}

export interface SideNavProps {
    menus: Menu[]
    children?: JSX.Element[] | JSX.Element
}

export const SideNav = (props: SideNavProps) => {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    // let selectedMenuIndex = 0

    // useEffect(() => {
    // }, [selectedMenuIndex])

    return (
        <div className="SideNav"
             css={style()}>
            <div id={"sideNav"}>
                <img src={"https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1603679690/noticon/g16oddfpbk4wci2ec7nr.gif"}></img>
                {
                    props.menus.map((menu: Menu, idx: number) => {
                        return <div key={idx}
                                    onClick={() => {
                                        setSelectedMenuIndex(idx)
                                    }}
                                    className={"sideNavMenu"}
                        >
                            {menu.label}
                        </div>
                    })
                }
            </div>
            <div id={"content"}>
                {props.children}
                <div className={"main-content"}>
                    {props.menus[selectedMenuIndex].component}
                </div>
            </div>
        </div>
    );
}

SideNav.defaultProps = {}