import Input from "./Input.jsx";
import {useState} from "react";

const Search = ({onSearch}) => {

    const [searchText, setSearchText] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if(debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            onSearch(value);
        }, 500);
        setDebounceTimer(timer);
    }

    return(
        <div>
            <Input
                type="text"
                name="search"
                placeholder="검색어를 입력하세요."
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default Search;