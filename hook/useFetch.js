import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '13f7370b6fmshe64661ad06f4062p158b51jsnfd2233f6e64d',    //ik i should not have done this but i was in a hurry , i will remove it later :(
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        params: {...query}   ,               //endpoint aur query ko dynamic banana jarrori tha , isiliye as a prop pass kiya
        // {query: 'web devloper job in noida', page: '1', num_pages: '1'},
       
      };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    },[]);


    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    //useFetch ka kaam hi yahi tha ki khuch data fetch kare aur usko return kare
    return { data, isLoading, error, refetch };


};

export default useFetch;