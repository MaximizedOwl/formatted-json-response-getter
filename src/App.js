import { useState } from 'react';
import './App.css';
// import { useAPIRequest } from './api/useAPIRequest';

function App() {
  /* 
    JSONを取得し、整形、テキストエリアに出力する処理
  */
  const [formattedResult, setFormattedResult] = useState('');

  const getFormattedJson = () => {
    console.log('getFormattedJson: 開始');

    console.log('apiRequest(): ' + apiRequest());
    // document.getElementById('result').value = apiRequest();
    setFormattedResult(apiRequest());

    console.log('getFormattedJson: 終了');
  };

  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /* 
    WebAPIを叩く処理
  */
  const apiRequest = () => {
    console.log('APIリクエスト処理: 開始');

    const url = document.getElementById('url-input').value;

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setJson(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    console.log('APIリクエスト処理: 終了');

    if (error) {
      return 'Error: ' + error.message;
    } else if (!isLoaded) {
      return 'Loading...';
    } else {
      return JSON.stringify(json, null, 2);
    }
  };

  /* 
    コードをクリップボードにコピーする処理
  */
  const copyToClipboard = () => {
    var text = document.getElementById('result').value;
    navigator.clipboard.writeText(text).then((e) => {
      alert('Copied!');
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Formatted JSON Response Getter</h2>
      </header>

      <main className='App-main'>
        <div className='form'>
          <form>
            <label id='url-label'>
              <input
                id='url-input'
                type='url'
                name='url'
                placeholder='https://api.xxx.com/users/aaa'
                autofocus
                required
              />
            </label>
            <input
              type='button'
              value='Request'
              onClick={() => getFormattedJson()}
            />
          </form>
        </div>
        <div className='resultArea'>
          <h2>Result</h2>
          <textarea
            name=''
            id='result'
            cols='150'
            rows='25'
            value={formattedResult}></textarea>
          {/* <pre>
              <code id='result'>{formattedResult}</code>
            </pre> */}
        </div>
        <div id='copy'>
          <button type='button' id='button' onClick={() => copyToClipboard()}>
            Copy to Clipboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
