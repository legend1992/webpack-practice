import $ from '../../../node_modules/jquery';
{
	let view = $('#headerWrapper');
	let Controller = function () {
		return {
			view: null,
			headerHeight: 0,
			activeMenuIndex: 0,
			pathList: ['index.html', 'news.html', 'contactUs.html'],
			anchorArr: [['news', 'partner']],
			init(view) {
				this.view = view;
				this.view.html(this.createHeader());
				this.headerHeight = this.view.height();
				this.bindEvents();
				this.selectMenu();
				$('html,body').stop().css({ 'scrollTop': 0 });
				setTimeout(() => {
					this.selectSecondMenu(window.location.href.split('#')[1]);
				});
			},
			bindEvents() {
				this.menuHover();
				$('.secondMenu a').click((e) => {
					e.preventDefault();
					if ($(e.target).closest('li.navLi').index() !== this.activeMenuIndex) {
						window.location.href = $(e.target).attr('href')
					} else {
						let targetAnchor = $(e.target).attr('href').split('#')[1];
						this.selectSecondMenu(targetAnchor);
					}
				})
			},
			createHeader() {
				let headerHtml =
				`<div class="header clear content1200">
					<div class="logo left"><a href="index.html"></a></div>
					<div class="nav right">
						<ul class="clear">
							<li class="navLi active">
								<a class="routerLink" href="index.html">首页</a>
								<ul class="secondMenu">
									<li><a href="index.html#${this.anchorArr[0][0]}">新闻动态</a></li>
									<li><a href="index.html#${this.anchorArr[0][1]}">合作机构</a></li>
								</ul>
							</li>
							<li class="navLi">
								<a class="routerLink" href="news.html">新闻动态</a>
							</li>
							<li class="navLi">
								<a class="routerLink" href="contactUs.html">联系我们</a>
							</li>
						</ul>
					</div>
				</div>`;
				return headerHtml;
			},
			selectMenu() {
				let idx = 0;
				let pathArr = window.document.location.pathname.split('/');
				let currentDir = pathArr[pathArr.length - 1];
				if (currentDir) {
					switch (currentDir) {
						case 'news.html':
						case 'news-detail.html':
							idx = 1;
							break;
						case 'contactUs.html':
							idx = 2;
							break;
						default:
							idx = 0;
					}
				}
				this.activeMenuIndex = idx;
				this.view.find('.navLi').eq(this.activeMenuIndex).addClass('active').siblings('li').removeClass('active');
			},
			menuHover() {
				$('.header .navLi').hover(function () {
					$(this).find('.secondMenu').stop().fadeIn()
				}, function () {
					$(this).find('.secondMenu').stop().fadeOut()
				})
			},
			selectSecondMenu(targetAnchor) {
				if (!targetAnchor) { return }
				let index = this.anchorArr[this.activeMenuIndex].indexOf(targetAnchor);
				$('.header li.navLi.active .secondMenu li').eq(index).addClass('active').siblings('li').removeClass('active');
				let targetEleTop = $('#' + targetAnchor).offset() ? $('#' + targetAnchor).offset().top - this.headerHeight : 0;
				$('html,body').stop().animate({ 'scrollTop': targetEleTop }, 400);
			}
		}
	}
	let controller = Controller();
	controller.init(view);
}

{
	let footerHtml =
	`<div class="content1200 clear">
		<dl class="left">
			<dt>详细地址</dt><dd>xx市xx区xx路xx大厦xx层</dd>
			<dt>电子邮箱</dt><dd>xxxx@yyyy.COM</dd>
			<dt style="margin-bottom:0;">联系电话</dt><dd style="margin-bottom:0;">0755-xxxxxxxx</dd>
		</dl>
		<ul class="code clear right">
			<li>
				<img src="${require(`../../images/1headerAndBottom/5_bottom_erweima_jituan.png`)}" alt="公司一">
				<p>公司一</p>
			</li>
			<li>
				<img src="${require(`../../images/1headerAndBottom/6_bottom_erweima_jinfu.png`)}" alt="公司二">
				<p>公司二</p>
			</li>
			<li>
				<img src="${require(`../../images/1headerAndBottom/7_bottom_erweima_qiche.png`)}" alt="公司三">
				<p>公司三</p>
			</li>
		</ul>
	</div>`;
	$('#footerWrapper').html(footerHtml);
}