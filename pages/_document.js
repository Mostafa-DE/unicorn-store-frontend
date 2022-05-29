import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="manifest"
                          href="/manifest.json"
                    />
                    <link rel="apple-touch-icon"
                          href="/icon.png"
                    />
                    <meta name="theme-color"
                          content="#fb9aa7"
                    />

                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                        integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
