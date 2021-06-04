import { useState } from 'react';
import './App.css';
// import { useAPIRequest } from './api/useAPIRequest';

function App() {
  /* 
    JSONを取得し、整形、テキストエリアに出力する処理
  */
  const useFormattedJson = () => {
    console.log('getFormattedJson: 開始');

    console.log('apiRequest(): ' + apiRequest());
    document.getElementById('result').value = apiRequest();

    console.log('getFormattedJson: 終了');
  };

  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const constructedUrl = 'https://api.github.com/users/defunkt';

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  const apiRequest = () => {
    console.log('APIリクエスト処理: 開始');

    fetch(constructedUrl)
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
            <input type='button' value='取得' onClick={useFormattedJson} />
          </form>
        </div>
        <div className='resultArea'>
          <div>
            <h3>Result</h3>
          </div>
          <div className='resultJson'>
            <textarea name='' id='result' cols='150' rows='25'></textarea>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
