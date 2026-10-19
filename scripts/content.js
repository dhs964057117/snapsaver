const play = 'https://play.google.com/store/apps/details?id=com.awesome.dhs.tools.snapsave';
exports.resourceLabels = {
  en: { title: 'Guides & support', links: ['How to download videos', 'Fix detection & download problems', 'About SnapSaver & support'], privacy: 'Privacy Policy' },
  'zh-CN': { title: '使用指南与支持', links: ['如何下载网页视频', '排查嗅探与下载问题', '关于 SnapSaver 与支持'], privacy: '隐私政策' },
  'zh-HK': { title: '使用指南與支援', links: ['如何下載網頁影片', '排查偵測與下載問題', '關於 SnapSaver 與支援'], privacy: '私隱政策' }
};
exports.pages = [
  {
    lang: 'en', group: 'download', path: '/guides/download-videos/',
    title: 'How to download web videos on Android with SnapSaver',
    description: 'Open a page, play its video, select a detected resource, and find your saved files. A practical guide to the SnapSaver Android browser.',
    body: `<h2>Start with the Android app</h2><p>SnapSaver combines a browser, media detection, a download manager, and a player. Install it from <a href="${play}">Google Play</a> on Android 7.0 or later. This website explains the app; downloads run on your phone.</p>
<h2>Save a video from a web page</h2><ol><li>Open SnapSaver and enter the address of a page containing a video you are allowed to save. You can also copy a link or share it to SnapSaver from another app.</li><li>Play the video. Many sites request the media only after playback starts, so wait for the player to load.</li><li>Open the detected media list using the download control. Check the available items and choose the video you want. A page can contain previews, adverts, and more than one quality option.</li><li>Start the download and check its progress in the download manager. Keep a working network connection and enough free storage.</li><li>Open the completed item in the file manager to play it, rename it, or share it with another app.</li></ol>
<h2>MP4 files and M3U8 playlists work differently</h2><p>An MP4 URL usually points to a media file. An M3U8 URL points to an HLS playlist that references smaller media segments. The playlist alone is not the entire video. Availability depends on the website, the playlist, and whether the referenced resources can still be accessed.</p>
<h2>If the download does not appear</h2><p>Refresh the page and start playback again. A visible player does not guarantee a downloadable resource: DRM, expired URLs, sign-in requirements, and unsupported players can prevent detection or downloading. See the <a href="/guides/video-not-detected/">detection and download troubleshooting guide</a> for checks in order.</p>
<h2>Finding the downloaded file</h2><p>Check the app's completed downloads and file manager first. A file stored there may need to be shared or exported before it appears in another gallery or player. Do not delete app data as a troubleshooting step without preserving files you need.</p>`
  },
  {
    lang: 'en', group: 'troubleshooting', path: '/guides/video-not-detected/',
    title: 'Video not detected or download failed? SnapSaver troubleshooting',
    description: 'Check playback, media selection, expired links, storage, Android background limits, and website restrictions when a SnapSaver download fails.',
    body: `<h2>The media list is empty</h2><p>Open the original page in SnapSaver and start the video, rather than only opening a preview image or search result. Wait for actual playback. If no resource appears, refresh once and try playback again. If the site requires sign-in, its access rules still apply inside the browser.</p>
<h2>The file is a preview or the wrong video</h2><p>Pages can load advertisements, thumbnails, short previews, and several video qualities. Compare the detected items and choose the one associated with your video. Playing the intended video again can help distinguish its request from other page resources.</p>
<h2>A download fails immediately</h2><p>Media addresses can expire or require the original browsing session. Return to the page, play the video, and select a newly detected item. Repeatedly retrying an old media URL will not renew its access. Some servers also restrict external downloads.</p>
<h2>An M3U8 download stops partway through</h2><p>HLS video depends on a playlist and its media segments. If a segment has expired, the stream has ended, or access changes, the download may be incomplete. A stable connection helps, but cannot restore content the server no longer provides.</p>
<h2>Downloads stop when the screen turns off</h2><p>Check the device's battery and background activity settings for SnapSaver, especially if the phone has a power-saving mode. Retry while the app is in the foreground to see whether the issue is related to background limits. Also check free storage and network availability.</p>
<h2>The file downloaded but is missing from the gallery</h2><p>Look in SnapSaver's completed downloads and file manager. Try opening it in the built-in player, then use the app's share or export options if you want another app to access it.</p>
<h2>Website restrictions and support</h2><p>SnapSaver does not guarantee downloads from every site or every player. Protected media and access restrictions may prevent a file from being saved. For unresolved problems, contact the developer through <a href="${play}">App support on Google Play</a>. Include the app version, Android version, error text, and a public example page if possible. Never send account credentials or private session links.</p>`
  },
  {
    lang: 'en', group: 'support', path: '/support/',
    title: 'About SnapSaver for Android & app support',
    description: 'Official SnapSaver website: Android requirements, Google Play installation, browser and media features, troubleshooting, and developer support.',
    body: `<h2>What is SnapSaver?</h2><p>SnapSaver is an Android browser with media detection, downloads, a file manager, and media playback. It helps you find media resources requested by a page and manage saved files on your device. Website and format support varies with the source.</p>
<h2>Install the Android app</h2><p>The app requires Android 7.0 or later. Its Google Play package is <code>com.awesome.dhs.tools.snapsave</code>. Use the <a href="${play}">official Google Play listing</a> to check the current version, device compatibility, pricing, and release notes. Core features are free; the app includes advertising and optional purchases.</p>
<h2>Get help with a download</h2><p>Start with <a href="/guides/download-videos/">the download guide</a> or <a href="/guides/video-not-detected/">troubleshooting</a>. To contact the developer, open the App support section of the Google Play listing. Include the installed version, Android version, what you expected, and the error you saw.</p>
<h2>Browser privacy</h2><p>No SnapSaver account is needed to start browsing. Incognito mode controls local browsing records; it does not make traffic anonymous to websites or network providers. The app uses third-party services, including advertising, and its optional weather feature can use location. Read the <a href="/privacy/">privacy information</a> before using those features.</p>
<h2>About this website</h2><p>This is the official product website at snapsaver.suanss.com. It provides app information and instructions. It does not accept video URLs or process downloads on a server. Use the language links to choose a translated page.</p>`
  },
  {
    lang: 'zh-CN', group: 'download', path: '/zh-CN/guides/download-videos/',
    title: '如何用 SnapSaver 在 Android 下载网页视频',
    description: '从打开网页、播放视频和选择嗅探资源，到管理已下载文件，了解 SnapSaver 安卓浏览器的实际操作步骤与格式限制。',
    body: `<h2>先安装安卓应用</h2><p>SnapSaver 将浏览器、媒体嗅探、下载管理、文件管理与播放器放在同一个应用中。请在 Android 7.0 或更新版本上通过 <a href="${play}">Google Play</a> 安装。官网提供使用说明，下载操作在手机 App 中完成。</p>
<h2>下载网页视频的步骤</h2><ol><li>在 SnapSaver 打开包含目标视频的网页。也可以复制视频链接，或从其他应用将链接分享到 SnapSaver。</li><li>点击播放，等待视频真正开始加载。许多网站只会在播放后请求媒体资源。</li><li>通过下载入口打开已检测到的媒体列表，选择需要保存的资源。列表可能同时包含预览、广告和不同清晰度的视频。</li><li>开始下载，在下载管理中查看进度，并保持网络连接及足够的存储空间。</li><li>在已完成任务或文件管理中打开文件，使用内置播放器播放，或重命名、分享给其他应用。</li></ol>
<h2>MP4 与 M3U8 有什么区别？</h2><p>MP4 链接通常指向媒体文件；M3U8 是 HLS 播放列表，其中记录多个媒体分片的地址，单独保存播放列表并不等于保存完整视频。下载能否完成，取决于资源是否仍可访问、播放列表形式以及网站的限制。</p>
<h2>为什么没有发现视频？</h2><p>可先刷新网页并重新播放。网页能播放不代表一定可以下载：DRM、链接过期、登录要求或不支持的播放器，都可能阻止嗅探或保存。请按<a href="/zh-CN/guides/video-not-detected/">嗅探与下载故障排查指南</a>逐项检查。</p>
<h2>下载后到哪里找文件？</h2><p>先查看 App 的已完成下载和文件管理。保存在应用中的文件，可能需要分享或导出后才会出现在其他图库或播放器中。排查问题前请保留重要文件，不要直接清除应用数据。</p>`
  },
  {
    lang: 'zh-CN', group: 'troubleshooting', path: '/zh-CN/guides/video-not-detected/',
    title: 'SnapSaver 嗅探不到视频或下载失败怎么办？',
    description: '按顺序检查播放状态、资源选择、过期链接、M3U8 分片、存储空间及安卓后台限制，定位 SnapSaver 下载问题。',
    body: `<h2>资源列表为空</h2><p>在 SnapSaver 中打开视频原始网页，而不只是预览图或搜索结果，并点击播放，等待实际加载。如果没有发现资源，可以刷新一次后重新播放。需要登录的网站，仍然受网站本身的访问规则约束。</p>
<h2>下载成了预览片段或其他视频</h2><p>同一页面可能加载广告、缩略图、短预览和多个清晰度。对比资源列表，选择对应目标视频的项目。重新播放目标视频，有助于区分它和页面中的其他资源。</p>
<h2>开始下载后立即失败</h2><p>媒体链接可能带有时效或依赖原来的浏览会话。返回网页重新播放，再选择新嗅探到的资源。反复重试旧链接不会更新访问权限；部分服务器也会限制外部下载。</p>
<h2>M3U8 下载到一半停止</h2><p>HLS 需要访问播放列表及多个媒体分片。分片过期、直播结束或访问条件改变，可能导致文件不完整。保持网络稳定有帮助，但不能恢复服务器已移除的内容。</p>
<h2>锁屏或切换应用后下载停止</h2><p>检查设备是否启用了省电模式，以及 SnapSaver 的后台活动是否受到限制。可先保持 App 在前台重试，判断是否与后台限制有关，同时检查剩余空间和网络状态。</p>
<h2>下载完成却不在相册中</h2><p>先到 SnapSaver 的已完成下载和文件管理中查找，尝试使用内置播放器打开，再通过分享或导出让其他应用读取文件。</p>
<h2>仍然无法解决</h2><p>并非所有网站和播放器都支持下载，受保护媒体及访问限制可能阻止保存。请通过 <a href="${play}">Google Play 的“应用支持”</a>联系开发者，提供 App 版本、Android 版本、错误提示及可公开访问的示例网页。不要发送密码或包含私人会话信息的链接。</p>`
  },
  {
    lang: 'zh-CN', group: 'support', path: '/zh-CN/support/',
    title: '关于 SnapSaver 安卓浏览器与应用支持',
    description: '了解 SnapSaver 的系统要求、Google Play 安装入口、浏览器与媒体功能、故障排查方法及开发者支持渠道。',
    body: `<h2>SnapSaver 是什么？</h2><p>SnapSaver 是一款集成媒体嗅探、下载管理、文件管理和媒体播放的 Android 浏览器，帮助你发现网页请求的媒体资源，并管理保存在设备上的文件。网站及格式支持情况取决于资源来源。</p>
<h2>系统要求与安装</h2><p>应用需要 Android 7.0 或更新版本，Google Play 包名为 <code>com.awesome.dhs.tools.snapsave</code>。请在<a href="${play}">官方 Google Play 页面</a>查看当前版本、设备兼容性、价格和更新说明。核心功能免费，应用包含广告与可选购买项目。</p>
<h2>使用帮助与联系</h2><p>下载操作可先阅读<a href="/zh-CN/guides/download-videos/">使用指南</a>，异常情况可查看<a href="/zh-CN/guides/video-not-detected/">故障排查</a>。联系开发者时，请打开 Google Play 页面中的“应用支持”，并说明安装版本、Android 版本、预期操作和实际错误。</p>
<h2>浏览隐私</h2><p>开始浏览无需注册 SnapSaver 账号。无痕模式用于控制本地浏览记录，不会向网站或网络服务商隐藏网络身份。应用会使用广告等第三方服务，可选的天气功能可能使用位置信息，详情请阅读<a href="/privacy/">隐私说明（英文）</a>。</p>
<h2>关于本网站</h2><p>snapsaver.suanss.com 是 SnapSaver 官方产品网站，提供 App 信息和使用说明。本站不接收视频链接，也不在服务器上处理下载。可通过语言链接切换对应页面。</p>`
  },
  {
    lang: 'zh-HK', group: 'download', path: '/zh-HK/guides/download-videos/',
    title: '如何用 SnapSaver 在 Android 下載網頁影片',
    description: '從開啟網頁、播放影片與選擇偵測資源，到管理已下載檔案，了解 SnapSaver 安卓瀏覽器的操作步驟與格式限制。',
    body: `<h2>先安裝安卓應用程式</h2><p>SnapSaver 整合瀏覽器、媒體偵測、下載管理、檔案管理及播放器。請在 Android 7.0 或更新版本透過 <a href="${play}">Google Play</a> 安裝。官網提供說明，下載操作在手機 App 中完成。</p>
<h2>下載網頁影片的步驟</h2><ol><li>在 SnapSaver 開啟包含目標影片的網頁，或複製連結、從其他應用程式分享連結到 SnapSaver。</li><li>點擊播放，等待影片實際載入。許多網站只在播放後才請求媒體資源。</li><li>透過下載入口開啟已偵測到的媒體列表，選擇需要儲存的項目。列表可能包含預覽、廣告及不同畫質。</li><li>開始下載，在下載管理中查看進度，保持網絡連線及足夠的儲存空間。</li><li>在已完成任務或檔案管理中開啟檔案，使用內置播放器播放，或重新命名、分享到其他應用程式。</li></ol>
<h2>MP4 與 M3U8 有何不同？</h2><p>MP4 連結通常指向媒體檔案；M3U8 是 HLS 播放清單，記錄多個媒體分段的地址，單獨儲存清單不等於儲存完整影片。能否下載取決於資源是否仍可存取、清單形式及網站限制。</p>
<h2>為何未能偵測影片？</h2><p>可先重新整理網頁並播放。網頁能播放不代表一定能下載：DRM、連結過期、登入要求或不支援的播放器，都可能阻止偵測或儲存。請參閱<a href="/zh-HK/guides/video-not-detected/">偵測與下載故障排查</a>。</p>
<h2>下載後在哪裏找檔案？</h2><p>先查看 App 的已完成下載及檔案管理。應用程式內的檔案可能需要分享或匯出，才會出現在其他相簿或播放器中。排查前請保留重要檔案，避免直接清除應用程式資料。</p>`
  },
  {
    lang: 'zh-HK', group: 'troubleshooting', path: '/zh-HK/guides/video-not-detected/',
    title: 'SnapSaver 偵測不到影片或下載失敗怎麼辦？',
    description: '逐項檢查播放狀態、資源選擇、過期連結、M3U8 分段、儲存空間及安卓背景限制，找出 SnapSaver 下載問題。',
    body: `<h2>資源列表為空</h2><p>在 SnapSaver 開啟影片原始網頁，並點擊播放，等待實際載入。不要只開啟預覽圖或搜尋結果。若沒有資源，可重新整理一次後再播放。需要登入的網站仍受其存取規則約束。</p>
<h2>下載成了預覽或其他影片</h2><p>同一頁面可能載入廣告、縮圖、短預覽及不同畫質。比較資源列表，選擇目標影片對應的項目。再次播放目標影片有助區分其他頁面資源。</p>
<h2>下載立即失敗</h2><p>媒體連結可能過期或依賴原來的瀏覽工作階段。返回網頁播放，並選擇新偵測的資源。重試舊連結不會更新存取權限；部分伺服器亦會限制外部下載。</p>
<h2>M3U8 下載中途停止</h2><p>HLS 需要存取播放清單及多個媒體分段。分段過期、直播結束或存取條件改變，可能導致檔案不完整。穩定網絡有幫助，但無法恢復伺服器已移除的內容。</p>
<h2>鎖屏或切換應用程式後停止</h2><p>檢查省電模式及 SnapSaver 的背景活動限制。先保持 App 在前景重試，以判斷是否與背景限制有關，同時檢查剩餘空間與網絡狀態。</p>
<h2>下載完成卻不在相簿中</h2><p>先到已完成下載及檔案管理中尋找，嘗試使用內置播放器開啟，再透過分享或匯出讓其他應用程式讀取。</p>
<h2>仍然未能解決</h2><p>並非所有網站或播放器都支援下載，受保護媒體及存取限制可能阻止儲存。請透過 <a href="${play}">Google Play 的應用程式支援</a>聯絡開發者，提供 App 版本、Android 版本、錯誤提示及可公開存取的範例網頁。切勿傳送密碼或私人工作階段連結。</p>`
  },
  {
    lang: 'zh-HK', group: 'support', path: '/zh-HK/support/',
    title: '關於 SnapSaver 安卓瀏覽器與應用程式支援',
    description: '了解 SnapSaver 的系統要求、Google Play 安裝入口、瀏覽器與媒體功能、故障排查及開發者支援渠道。',
    body: `<h2>SnapSaver 是甚麼？</h2><p>SnapSaver 是整合媒體偵測、下載管理、檔案管理及媒體播放的 Android 瀏覽器，協助你發現網頁請求的媒體資源，並管理裝置上的檔案。網站及格式支援情況取決於資源來源。</p>
<h2>系統要求與安裝</h2><p>應用程式需要 Android 7.0 或更新版本，Google Play 套件名稱為 <code>com.awesome.dhs.tools.snapsave</code>。請於<a href="${play}">官方 Google Play 頁面</a>查看當前版本、裝置相容性、價格及更新說明。核心功能免費，應用程式包含廣告與可選購買項目。</p>
<h2>使用說明與聯絡</h2><p>可先閱讀<a href="/zh-HK/guides/download-videos/">下載指南</a>及<a href="/zh-HK/guides/video-not-detected/">故障排查</a>。聯絡開發者時，請開啟 Google Play 頁面的應用程式支援，說明安裝版本、Android 版本、預期操作及實際錯誤。</p>
<h2>瀏覽私隱</h2><p>開始瀏覽無需註冊 SnapSaver 帳號。無痕模式控制本地瀏覽記錄，不會向網站或網絡供應商隱藏網絡身份。應用程式使用廣告等第三方服務，可選天氣功能可能使用位置資料，詳情請閱讀<a href="/privacy/">私隱說明（英文）</a>。</p>
<h2>關於本網站</h2><p>snapsaver.suanss.com 是 SnapSaver 官方產品網站，提供 App 資訊及使用說明。本站不接收影片連結，也不在伺服器處理下載。可透過語言連結切換對應頁面。</p>`
  }
];
