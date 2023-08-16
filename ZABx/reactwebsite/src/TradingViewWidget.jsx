// TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';

let tvScriptLoadingPromise;
export default function TradingViewWidget() {
  const { sym} = useParams();
  const onLoadScriptRef = useRef();
  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_d836d') && 'TradingView' in window) {
          new window.TradingView.widget({
            width: 980,
            height: 610,
            symbol: sym,
            interval: "D",
            timezone: "Asia/Karachi",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            details: true,
            container_id: "tradingview_d836d"
          });
        }
      }
    },[sym] );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_d836d' />
      </div>
  );
}