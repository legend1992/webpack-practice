import '../../css/newsDetail.scss';
import $ from '../../../node_modules/jquery';
import { getUrlParam } from '../public/public.js';
import { newsContentList } from './newsTemplate.js';
{
  let newsId = parseInt(getUrlParam('newsId'));
  // 渲染页面
  currentNewsRedering();
  otherNewsRedering();
  // 翻页器
  paging();

  // 当前新闻
  function currentNewsRedering() {
    let templateObj = newsContentList[newsId];
    $('#newsContent').html(templateObj.template);
    $('#newsTitle').html(templateObj.title);
    $('#newsDate').html(templateObj.date);
  }
  // 其它新闻
  function otherNewsRedering() {
    let indexArr = [0,1,2,3];
    let news1, news2, news3;
    if(indexArr.indexOf(newsId) > -1){
      indexArr.splice(newsId,1);
    }
    news1 = newsContentList[indexArr[0]];
    news2 = newsContentList[indexArr[1]];
    news3 = newsContentList[indexArr[2]];
    $('.otherNews .up a').attr('href', `./news-detail.html?newsId=${indexArr[0]}`).find('h4').html(news1.title).siblings('p').html(news1.otherNewsTemplate);
    $('.otherNews .bottom li:first-child a').attr('href', `./news-detail.html?newsId=${indexArr[1]}`).html(news2.title);
    $('.otherNews .bottom li:last-child a').attr('href', `./news-detail.html?newsId=${indexArr[2]}`).html(news3.title);
  }
  // 分页
  function paging() {
    if(newsContentList.length>1){
      if (newsId === 0) {
        disabledPage('#previousPage');
        createNext()
      } else if (newsId > 0 && newsId < newsContentList.length - 1) {
        createPrev();
        createNext();
      } else {
        disabledPage('#nextPage');
        createPrev()
      }
    }else{
      disabledPage('#previousPage, #nextPage');
    }
  }
  function disabledPage(query) {
    $(query).addClass('disabled').find('a').attr('href', 'javascript:;').find('span.title').text('无');
  }
  function createPrev() {
    $('#previousPage').removeClass('disabled').find('a').attr('href', `./news-detail.html?newsId=${newsId - 1}`).find('span.title').html(newsContentList[newsId - 1].title);
  }
  function createNext() {
    $('#nextPage').removeClass('disabled').find('a').attr('href', `./news-detail.html?newsId=${newsId + 1}`).find('span.title').html(newsContentList[newsId + 1].title);
  }
}