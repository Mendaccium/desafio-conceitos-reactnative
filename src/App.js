import React, {useEffect, useState} from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
      const [repositories, setRepositories] = useState([]);

      useEffect(() => {
        api.get('repositories').then(response =>{
          setRepositories(response.data);
        })
      }, []);
      
  async function handleLikeRepository(id, index) {
    const response = await api.post(`repositories/${id}/like`);
      if(response.status == 200){
        const repo = repositories;
        repo[index].likes += 1;
        console.log(repo);
        setRepositories([...repo]);

      }
    }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
        <FlatList
          data = {repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item: repository, index}) => (
              <View style={styles.repositoryContainer}>  
                <Text style={styles.repository}>{repository.title}</Text>
            
                <View  style={styles.techsContainer}>
                  {repository.techs.map(techs =>
                      
                        <Text style={styles.tech}>
                          {techs} 
                        </Text>
                  )}
                </View>
            

             {/* <FlatList
              data={repository.techs}
              keyExtractor={repository => repository.techs}
              renderItem={({item: techs}) =>
                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>
                    {techs} 
                  </Text>
                  <Text style={styles.tech}>
                    Node.js
                  </Text>
                </View>
            } 
            /> */}
            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-1`}
              >
                {repository.likes}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id,index)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-1`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
            </View>
          )}
        />  
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
