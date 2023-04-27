import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";

import styles from "./welcome.style";

import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Internship"];

const Welcome = ({searchTerm, setSearchTerm , handleClick}) => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>

      <View style={styles.container}>
        <Text style={styles.userName}>Hello Mr.Swastik</Text>
        <Text style={styles.welcomeMessage}>Find your perfect Job.</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchTerm}
            onChangeText={(text) => {setSearchTerm(text)}}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}

          keyExtractor={(item) => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        ></FlatList>
      </View>

    </View>
  );
};

export default Welcome;
