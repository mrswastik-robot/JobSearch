import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState , useEffect} from "react";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  // const isLoading = false;
  // const error = false;
  //ab inki jaroorat nhi hain kyunki ab return ho kr aara hain useFetch se, to ab destructure krke use kr skte hain

  const {data, isLoading, error} = useFetch('search', {query:'Intern role in noida india', num_pages: '1'})
  // console.log(data);


  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {                              //ye function yaha se popularJOBSCARD me ja rha hain aur phir waha se tap krne pe time k saath waapas yaha aa kr execute ho raha hain
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);                                   //ye setSelectedJob ka kaam ye hain ki ye popularJobCard me jaa raha aur phir waha styling k kaam aaraa jisse jab apan kisi card me tap kr rahe to uksa color change ho jara hain
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>


    </View>
  );
};

export default Popularjobs;
