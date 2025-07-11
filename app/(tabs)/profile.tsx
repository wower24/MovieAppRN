import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { getUserInfo } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useFocusEffect } from 'expo-router'
import React, { useCallback } from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
  const {
    data: user,
    loading: userLoading,
    error: userError,
    refetch: refetchUser
  } = useFetch(() => getUserInfo(123));

  /* 
  REFETCH USER EVERY TIME THE PROFILE PAGE IS ON
  */
  useFocusEffect(
  useCallback(() => {
    refetchUser();
  }, [refetchUser])
);

  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mx-auto"
      />
      <View className='flex items-center flex-1 flex-col gap-5 mt-20'>
        <Image
          source={icons.person}
          className="size-20"
          tintColor="#FFF"
        />
        <Text className="text-light-200 font-normal text-xl">
          {user?.username || `Username`}
        </Text>
        <View className='flex flex-col w-3/4 bg-dark-100 rounded-md px-10 py-5'>
          <View className='flex flex-row justify-between'>
            <Text className='text-white font-semibold text-base'>
              Movies watched:
            </Text>
            <Text className='text-light-200 font-semibold text-base'>
              {user?.watchedMovies.length || '0'}
            </Text>
          </View>
          <View className='flex flex-row justify-between mt-5'>
            <Text className='text-white font-semibold text-base'>
              Watchtime:
            </Text>
            <Text className='text-light-200 font-semibold text-base'>
              {user?.watchtime || '0'} minutes
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default profile