import { useEffect, useState } from "react";

const UseFetch = async (url) => {

    let [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        const reloadProfile = async () => {
            try {
                let profileData = await fetch(url);
                let newData = await profileData.json();
                if (url) {
                    setData(newData);
                }
            }
            catch (error) {
                console.log(`${error.message}와 같은 이유로 실행되지 못했습니다.`)
            }
        }
        reloadProfile();
    }, [url]);
    return data
}

export default UseFetch;
