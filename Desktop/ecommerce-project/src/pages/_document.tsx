/* eslint-disable @next/next/no-sync-scripts */
import Document, { Head, Html, Main, NextScript } from "next/document"
class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        <body>
          <Main />
          {/* <div className="embed-container">
            <div id="fb-root"></div>
            <div id="fb-customer-chat" className="fb-customerchat"></div>

            <div
              className="zalo-chat-widget"
              data-oaid="579745863508352884"
              data-welcome-message="Rất vui khi được hỗ trợ bạn!"
              data-autopopup="0"
              data-width=""
              data-height=""
            ></div>
          </div>

          <script src="https://sp.zalo.me/plugins/sdk.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "100797585961540");
            chatbox.setAttribute("attribution", "biz_inbox");

            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v13.0'
              });
            };

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
            }}
          ></script> */}

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
