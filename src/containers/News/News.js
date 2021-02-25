import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import titleImage from '../../assets/venice.jpg'
import profileImage from '../../assets/profile.jpeg'
import { withStyles } from '@material-ui/core/styles';

import ArticleItems from '../Articles/ArticleItems';
import ContentContainer from '../../components/UI/ContentContainer/ContentContainer';
import { withTranslation } from 'react-i18next';

const styles = theme => ({
    root: {
        paddingBottom: 100
    },
    titleImageDiv: {
        overflow: 'hidden'
    },
    titleImage: {

        objectFit: 'cover',
        // height: '400px',
        width: '1080px',
        marginTop: '20px',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
        // opacity: '0.8'
    },
    profileImage: {
        objectFit: 'contain',
        top: '180px',
        // marginTop: '20px',
        position: 'absolute',

        height: '300px',
        marginLeft: '65%',
        transform: 'translateX(-65%)',


        [theme.breakpoints.down('sm')]: {
            height: '250px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }
    },
    title: {
        top: '420px',
        // marginTop: '100px',
        marginLeft: '8%',
        transform: 'translateX(-5%)',
        position: 'absolute',
        width: '700px',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '1px 1px black',

        [theme.breakpoints.down('sm')]: {
            top: '360px',
            marginLeft: '40%',
            width: '250px',
            transform: 'translateX(-50%)'
        }
    }
});

class News extends Component {

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <ContentContainer>
                    <div className={this.props.classes.titleImageDiv}>
                        <img
                            className={this.props.classes.titleImage}
                            // src={titleImage}
                            src="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/lifereview%2Fcover.jpg?alt=media&token=98e2a593-7cec-4a5b-8a13-4192b9686df7"
                            alt='image'
                        />
                    </div>
                    {/* <img
                        className={this.props.classes.profileImage}
                        src={profileImage}
                        alt='image'
                    /> */}
                    <Typography variant="h6" align="left"
                        className={this.props.classes.title}
                    >
                        {t('lifereview.heading1')}<br/>
                        {t('lifereview.heading')}
                    </Typography>
                    <Grid container justify="center" className={this.props.classes.root}
                    // spacing={2} 
                    >
                        <Grid item>
                            <Typography variant="h5">
                                先夫
                            </Typography>
                            <Typography variant="h4"><strong>陳銘洪醫生</strong></Typography>
                            <Typography variant="h6">
                                痛於主曆2021年1月21日
                                在廣華醫院息勞歸主在世寄居六十五載遺體奉移紅磡萬國殯儀館治喪謹定於<br/>
                                <br/>主曆2021年2月26日（星期五)
                                <br/>下午5時在該館地下孝思大禮堂設靈
                                <br/>晚上7時30分舉行追思會<br/>
                                <br/>翌日2月27日（星期六）上午10時舉行安息禮拜
                                <br/>上午11時辭靈隨即出殯奉柩柴灣哥連臣角火葬場舉行火化禮
                                <br/>哀此訃<br/><br/>
                            </Typography>
                            <Typography variant="h3">
                            <strong>聞</strong>
                            </Typography>
                            <Typography variant="h6">
                                妻
                                </Typography>
                            <Typography variant="h5">
                            <strong>陳陳玩儀</strong>
                            </Typography>
                            <Typography variant="h6">
                                孝男卓謙 孝媳姚冠婷<br/>
                                孝男卓恆 孝媳廖麗華<br/>
                                孫男崇希<br/>
                                孫女希蕾<br/>
                            </Typography>
                            <Typography variant="h5">
                            <strong>敬告</strong>
                            </Typography>
                            <Typography variant="h6">
                                <br/>                                
                                懇辭花圈<br/>
                                如蒙賜賻<br/>
                                帛金撥捐<br/>
                                慈善用途<br/><br/>
                                治喪處：萬國殯儀館<br/>
                                地址：紅磡暢行道八號<br/>
                                電話：2303 1234<br/>
                                <br/>
                                追思會及安息禮拜直播連結:<br/>
                                請使用 Zoom 軟件登入:<br/>
                                <a href="https://zoom.us/j/95595672038">https://zoom.us/j/95595672038</a><br/>
                                <br/>
                                Meeting ID: 955 9567 2038<br/>
                                Passcode: 20210226<br/><br/>
                                <a href="https://firebasestorage.googleapis.com/v0/b/dad-page.appspot.com/o/news%2Fbrochure.pdf?alt=media&token=459fd5b2-780f-4f8f-ae02-ac5738848af9">程序表</a><br/><br/>
                                
                                
                            </Typography>
                        </Grid>
                    </Grid>
                </ContentContainer>
            </React.Fragment>
        );
    }
}

export default withTranslation()(withStyles(styles)(News));