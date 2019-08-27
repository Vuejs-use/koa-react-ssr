import React, {
    Component
} from 'react';

import { Link } from 'react-router-dom';
import utils from '../../common/module/utils';
import './index.scss';
import BaseComponent from '../../common/base/page-base-com';
import RootContext from '../../app/route-context';
import fetch from '../../common/fetch';

export default class Index extends BaseComponent {

    constructor(props, context) {
        super(props);
        this.state = {
            ... this.getInitialData(context)
        }
    }
    enableSpaDataCache = true;//开启 spa 数据缓存，刷新页面数据重新请求  

    //得到 context 对象
    static contextType = RootContext;

    static async  getInitialProps(krsOpt) {

        let { query, params } = krsOpt;

        const websiteBaseInfo = await fetch.postForm('/fe_api/filed-manager/get-common-info', {
            data: {}
        });

        const detailInfo = await fetch.postForm('/fe_api/products/get-detaildata', {
            data: {
                id: params.id
            }
        });

        const baseInfo = websiteBaseInfo.data;

        return {
            page: {
                tdk: {
                    title: baseInfo.siteTitle,
                    keyword: baseInfo.siteKeyword,
                    description: baseInfo.siteDes,
                }
            },
            fetchData:[websiteBaseInfo,detailInfo]
        }
    }

    componentDidMount() {
        if (!this.isSSR && !this.hasSpaCacheData) {// 页面如果是客户端的需要重新获取数据
            Index.getInitialProps(this.props.krsOpt).then(data => {
                this.setState({
                    ...data
                }, () => {
                    document.title = this.state.page.tdk.title;
                });
            });
        }
    }

    render() {

        const { page, fetchData } = this.state;
        const [baseinfo, newdet] = fetchData || [];
     
        if (fetchData) {
            const item = newdet.data[0];
            return <div className="page-product-detail">
                <h1>产品详情页面</h1> 
              
                <p>品牌:{item.brandName}</p>
                <p>类型:{item.ofTypeName}</p>
                <p>型号:{item.newModel}</p>
                <p>内径:{item.innerPath}</p>
                <p>外径:{item.outerPath}</p>
                <p>厚度:{item.thickNess}</p>

            </div>
        }
        return null;
    }

}