//页面的路由配置，可配置动态加载信息，必须返回Bundle 组件

import React from 'react';
import BaseBundle from '../../../routes/route-base-bundle';

const LazyPageCom = (props) => (
    <BaseBundle load={() => import(/*webpackChunkName:"chunk-news"*/'../index')}>
        {(CompIndex) => <CompIndex {...props} />}
    </BaseBundle>
);


export default [{
    path: '/news',
    component: LazyPageCom,
    exact: true
}
]

