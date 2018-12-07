import '../../css/contactUs.scss';
import $ from '../../../node_modules/jquery';
import { companyList } from './companyList.js';
(function () {
  // 渲染公司信息列表 
  var companyItemStr = '';
  $.each(companyList, function (index, item) {
    if (index === 0) {
      companyItemStr += '<li class="companyName active"><span>';
    } else {
      companyItemStr += '<li class="companyName"><span>';
    }
    companyItemStr += item.companyName + '</span></li>'
  });
  $('#companyList').html(companyItemStr);

  // 鼠标点击切换公司信息
  $('#companyList').on('click', '.companyName', function () {
    if ($(this).index() !== $('#companyList .active').index()) {
      $(this).addClass('active').siblings('.active').removeClass('active');
      renderCompanyMsg(companyList[$(this).index()]);
    }
  });
  
  function renderCompanyMsg(companyInfo) {
    $('#companyName').html(companyInfo.companyFullName);
    $('#companyEmail').html(companyInfo.companyEmail);
    $('#companyAddress').html(companyInfo.companyAddress);
    $('#companyTel').html(companyInfo.companyTel);
    drawMap(companyInfo.companyCoordinates);
  }
  renderCompanyMsg(companyList[0]);

  // 渲染地图 
  function drawMap(coordinates) {
    var map = new BMap.Map("mapContent");
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.MapTypeControl());
    var point = new BMap.Point(coordinates[0], coordinates[1]);
    map.centerAndZoom(point, 15);
    map.addOverlay(new BMap.Marker(point));
    map.enableScrollWheelZoom(true);
  }
  drawMap(companyList[0].companyCoordinates);
})();