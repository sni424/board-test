import { useEffect, useState } from "react";

export default function useFetch(url) {

    let [data, setData] = useState([]);

    useEffect(() => {
        const reloadProfile = async () => {
            try {
                let profileData = await fetch(url);
                let newData = await profileData.json();
                setData(newData);
            }
            catch (error) {
                console.log(`${error}와 같은 이유로 실행되지 못했습니다.`)
            }
        }
        reloadProfile();
    }, [url]);
    return data
}
