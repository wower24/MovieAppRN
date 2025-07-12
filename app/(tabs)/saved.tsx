import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovieById, fetchMovies } from '@/services/api';
import { getUserInfo } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';

const saved = () => {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  const {
    data: user,
    loading: userLoading,
    error: userError,
    refetch: refetchUser
  } = useFetch(() => getUserInfo(123));

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [])
  );

  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  useEffect(() => {
  if (!user?.watchedMovies) return;
  Promise.all(user.watchedMovies.map((id: number) => fetchMovieById(id.toString())))
    .then(setSavedMovies);
}, [user?.watchedMovies]);

  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
      >
        <Image 
                  source={icons.logo} 
                  className="w-12 h-10 mt-20 mx-auto" 
                />
        
        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>

          <FlatList
            data={savedMovies}
            renderItem={({ item }) => (
              <MovieCard
                {...item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 5,
              marginBottom: 10
            }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />

        </>
      </ScrollView>
    </View>
  )
}

export default saved