import '../../libs/swiper/swiper.min.scss';
import '../../css/news.scss';
import $ from '../../../node_modules/jquery';
import Swiper from '../../libs/swiper/swiper.min.js';
import { newsContentList } from './newsTemplate.js';
!function () {
  createNewsList();
  new Swiper('#contentWrapper .swiper-container', {
    effect: 'slide',
    speed: 600,
    loop: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '#contentWrapper .swiper-button-next',
      prevEl: '#contentWrapper .swiper-button-prev',
    }
  });
}()

function createNewsList() {
  var length = newsContentList.length;
  var html = '';
  for (let i = 0; i < length; i++) {
    html += `<div class="swiper-slide">
      <a href="./news-detail.html?newsId=${i}">
        <img src="${newsContentList[i].img}" alt="${newsContentList[i].title}" height="450" width="900">
        <p>${newsContentList[i].title}</p>
      </a>
    </div>`;
  }
  $('.swiper-wrapper').html(html);
}