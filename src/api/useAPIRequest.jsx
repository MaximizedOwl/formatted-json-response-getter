import { useEffect, useState } from 'react';

// レスポンス取得
export function useAPIRequest() {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const constructedUrl = 'https://api.github.com/users/defunkt';

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
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
  }, []);

  if (error) {
    return 'Error: ' + error.message;
  } else if (!isLoaded) {
    return 'Loading...';
  } else {
    return JSON.stringify(json, null, 2);
  }
}
