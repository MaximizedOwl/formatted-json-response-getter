import { useState } from 'react';
import { useAPIRequest } from './api/useAPIRequest';
import './App.css';

function App() {
  // リクエスト
  const [formattedJson, setJson] = useState(useAPIRequest());
  console.log(formattedJson);
  /* 
    JSONを取得し、整形、テキストエリアに出力する処理
  */
  const getFormattedJson = () => {
    // setJson();
    // Textareaへ出力
    // document.getElementById('result').value = formattedJson;
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
            <input type='button' value='取得' onClick={getFormattedJson()} />
          </form>
        </div>
        <div className='resultArea'>
          <div>
            <h3>Result</h3>
          </div>
          <div className='resultJson'>
            <textarea name='' id='result' cols='150' rows='25'>
              {useAPIRequest()}
            </textarea>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
