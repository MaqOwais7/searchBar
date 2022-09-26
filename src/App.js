import Search from './components/Search';
import { useState, useEffect } from 'react';
import getSuggestions  from './components/getSuggestions';


const searchStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
};

function App() {
  let [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  let [subString, setSub] = useState("");

  useEffect(() => {
    // fetch("https://api.datamuse.com/sug?s=" + subString + "&max=5")
    //   .then((response) => response.json())
    //   .then((response) => {
    //     const apiData = response.map((ele) => ele.word);
    //     setData(apiData);
    //     // console.log(apiData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let debounceTimer = 1000;

    const fun = (arg) => {
        getSuggestions(arg)
      .then(response => {
        setData(response);
        console.log(response);
      })
      .catch(err => {
      console.log(err);
    });
  }
  const debounceFn = (callb, debounceTimer) => {
    return (args) => {
        setTimeout(() => {
          callb(args)} , debounceTimer);
    }
  }

  const callThis = debounceFn(fun, debounceTimer);

  callThis(subString);


  }, [subString]);

  useEffect(() => {
    const arr = query.split(" ");
    const midWord = query.slice(0, (document.getElementById('ip')).selectionStart);
    const cur = arr[(midWord.split(" ")).length - 1];
    setSub(cur);
  }, [query]);

  return (
    <>
    <div style={searchStyle}>
      <Search data = {data} query={query}
        setQ={myQuery => setQuery(myQuery)}
        />
    </div>
    </>
  );
}

export default App;
