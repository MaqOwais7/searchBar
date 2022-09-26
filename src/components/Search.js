import logo from './logo.png';
// import searchlogo from './searchlogo.svg';
import './Search.css';
import { useState } from 'react';


const imageStyle = {
    width: 180,
    height: 174,
    borderRadius: '30%',
    borderWidth: 2,
    margin: 40,
    marginLeft: 60,
    boxShadow: '5px 5px 5px grey',
};

const searchIp = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
}

const inputStyle = {
    width: 600,
    height: 35,
    borderRadius: 12,
    padding: '-2px',
    boxShadow: '5px 5px 5px grey',
}

const Search = ({ data, query, setQ }) => {
    const [toggle, setToggle] = useState(false);
    return (<>
        <div id="logo">
            <img src={logo} style={imageStyle} alt="ThougthSpot"></img>
            <div style={searchIp}>
                <input id="ip" type={"text"} onFocus={() => setToggle(true)}
                onChange={(event) => {
                    // setToggle(!toggle);
                    setQ(event.target.value);
                }}
                style={inputStyle} placeholder="Search" value = {query}></input>
                <DropDown data = {data} toggle={toggle} setToggle={setToggle} query={query} setQ = {setQ}/>
                {/* <button style={buttonStyle}>
                </button> */}
            </div>
        </div>
    </>);
};

const DropDown = ({ data, toggle, setToggle, query, setQ }) => {
    if (query.length === 0){
        return null;
    }
    if (!toggle) {
      return null;
    }
    return (
      <div className="origin-top-right absolute right-0 mt-2 w-56
        rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ borderRadius: 5, backgroundColor: "grey" }}>
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">{data
                .map(list => (
                    <Info key={list.id}
                      list={list}
                      setQ = {setQ}
                      setToggle={setToggle}
                      pre = {query}
                      />
              ))
              }</div>
        </div>
      </div>
    )
  }

  const Info = ({ list, setQ, setToggle, pre }) => {
    const positionOfLetter = (document.getElementById('ip')).selectionStart;
    const [bgClr, setBg] = useState("grey");
    if (list === ""){
        return null;
    }
    const arr = pre.split(" ");
    const comp = arr.join(" ");
    const single = arr.pop();
    let pre1 = arr.join(" ");
    const newV = comp.slice(0, positionOfLetter);
    const midarr = newV.split(" ");
    const doub = midarr.pop();
    const prev = midarr.join(" ") + " ";
    const index = (midarr).length;
    const findInd = (word, ind) => {
        while (ind < word.length && word[ind] !== " "){
            ind++;
        }
        return ind + 1;
    }
    const post = comp.substring(findInd(comp, positionOfLetter));

    const styleB = {
        borderRadius: 5, backgroundColor: (single !== list && doub !== list ) ? "grey": "black", color: "white", borderColor: bgClr,
    };

    const decidePre = (cur) => {
        if (index < arr.length && post !== ""){
            console.log("check here ");
            setQ(prev +  cur + " " + post);
        }else{
            if (pre1 === ""){
                setQ(cur + " ");
            }else{
                setQ(pre1 + " " + cur + " ");
            }
        }
    };

    return (
        <div className="flex-grow" style={{ padding: 2, borderRadius: 5}}>
          <div className="flex items-center">
            <button style={styleB}
            onMouseEnter={() => {setBg("black")}}
            onMouseLeave={() => {setBg("grey")}}
            onClick={() => {
                    setToggle(false);
                    decidePre(list);
                }} className="flex-none font-medium text-2xl text-blue-500">
                {list}</button>
          </div>
        </div>
    )
  }

export default Search;
