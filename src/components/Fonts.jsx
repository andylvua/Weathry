import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
              @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-Bold.woff2') format('woff2'),
                url('font/SFProDisplay-Bold.woff') format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-BlackItalic.woff2') format('woff2'),
                url('font/SFProDisplay-BlackItalic.woff') format('woff');
            font-weight: 900;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-Regular.woff2') format('woff2'),
                url('font/SFProDisplay-Regular.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-ThinItalic.woff2') format('woff2'),
                url('font/SFProDisplay-ThinItalic.woff') format('woff');
            font-weight: 100;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-SemiboldItalic.woff2') format('woff2'),
                url('font/SFProDisplay-SemiboldItalic.woff') format('woff');
            font-weight: 600;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-Medium.woff2') format('woff2'),
                url('font/SFProDisplay-Medium.woff') format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-HeavyItalic.woff2') format('woff2'),
                url('font/SFProDisplay-HeavyItalic.woff') format('woff');
            font-weight: 900;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-UltralightItalic.woff2') format('woff2'),
                url('font/SFProDisplay-UltralightItalic.woff') format('woff');
            font-weight: 200;
            font-style: italic;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'SF Pro Display';
            src: url('font/SFProDisplay-LightItalic.woff2') format('woff2'),
                url('font/SFProDisplay-LightItalic.woff') format('woff');
            font-weight: 200;
            font-style: italic;
            font-display: swap;
        }
    `}
  />
);
export default Fonts;
