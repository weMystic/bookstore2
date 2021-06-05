import React from 'react';
import { Search, Icon, Nav, Shell } from '@alifd/next';

const { SubNav, Item, Group } = Nav;

import styles from './index.module.scss'
import TopAction from '../BasicLayout/components/TopAction';
import CardList from '@/components/FusionCardList';

const BookStoreLayout = ({ children }) => {


    return <div>
        <Shell className={styles['iframe-hack']} style={{border: '1px solid #eee'}}>
          <Shell.Branding>
            <div className={styles.rectangular}></div>
            <span style={{marginLeft: 10}}>App Name</span>
          </Shell.Branding>
          {/* <Shell.Navigation direction="hoz">
            <Search key="2" shape="simple" type="dark" palceholder="Search" style={{width: '200px'}}/>
          </Shell.Navigation> */}
          <Shell.Action>
            <TopAction></TopAction>
          </Shell.Action>


          <Shell.Content>
            {/* {children} */}
            <CardList></CardList>
          </Shell.Content>

          <Shell.Footer>
            <span>Alibaba Fusion</span>
            <span>@ 2019 Alibaba Piecework 版权所有</span>
          </Shell.Footer>
        </Shell>
      </div>

}

export default BookStoreLayout;